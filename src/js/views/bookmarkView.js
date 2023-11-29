import icons from '../../img/icons.svg';
import { View } from './View';

class BookmarkView extends View {
  _parentEl = document.querySelector('.bookmark');
  _errorMessage = 'No bookmark yet. Find a nice recipe and bookmark it';

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.pagination__btn');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler)
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupRecipeItem).join('');
  }

  _generateMarkupRecipeItem(recipe) {
    const id = window.location.hash.slice(1);
    return `
    <a class="item ${recipe.id === id ? 'item--active' : ''}" href="#${
      recipe.id
    }">
      <div class="item__left">
        <img
          src="${recipe.image}"
          alt="${recipe.title}"
          class="item__img"
        />
      </div>
      <div class="item__right">
        <h2 class="item__name">${recipe.title}</h2>
        <h3 class="item__desc">${recipe.publisher}</h3>
      </div>
    </a>
   `;
  }
}

export default new BookmarkView();
