import icons from '../../img/icons.svg';
import { View } from './View';

class RecipeView extends View {
  _parentEl = document.querySelector('.content');
  _errorMessage = 'We could not fund that recipe. Please try another one!';
  _message = '';

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach((e) => window.addEventListener(e, handler));
  }

  addHandlerUpdateServings(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.custom__icon--clickable');
      if (!btn) return;

      const updateTo = +btn.dataset.updateTo;
      if (updateTo > 0) handler(updateTo);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.custom_bookmark');
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup() {
    return `
    <figure class="banner">
      <img
        src="${this._data.image}"
        alt="${this._data.title}"
        class="banner__img"
      />
      <h1 class="banner__name">${this._data.title}</h1>
    </figure>
    <div class="custom">
      <div class="custom__info">
        <svg class="custom__icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="custom__number">${this._data.cookingTime}</span>
        <span> minutes</span>
      </div>
      <div class="custom__info">
        <svg class="custom__icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="custom__number">${this._data.servings}</span>
        <span> SERVINGS</span>
        <svg class="custom__icon custom__icon--clickable" data-update-to="${
          this._data.servings - 1
        }">
          <use href="${icons}#icon-minus-circle"></use>
        </svg>
        <svg class="custom__icon custom__icon--clickable" data-update-to="${
          this._data.servings + 1
        }">
          <use href="${icons}#icon-plus-circle"></use>
        </svg>
      </div>
      <div class="custom_bookmark">
        <svg class="custom__icon">
          <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
        </svg>
      </div>
    </div>
    <div class="ingredient">
      <div class="ingredient__title">recipe ingredients</div>
      <div class="ingredient__items">
        ${this._data.ingredients.map(this._generateMarkupIngredient).join('')}
      </div>
    </div>
    <div class="direction">
      <div class="direction__title">HOW TO COOK IT</div>
      <span class="direction__content">
        This recipe was carefully designed and tested by <b class="direction__publisher">${
          this._data.publisher
        }</b>. Please
        check out directions at their website.
      </span>
      <button class="direction__button">
        <span>Directions</span>
        <svg class="direction__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    </div>
   `;
  }

  _generateMarkupIngredient(ingredient) {
    return `
    <div class="ingredient__item">
      <svg class="ingredient_icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      <span class="ingredient__text"
        >${ingredient.quantity ? ingredient.quantity : ''} ${ingredient.unit} ${
      ingredient.description
    }</span
      >
    </div>
    `;
  }
}

export default new RecipeView();
