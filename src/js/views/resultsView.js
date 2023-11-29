import icons from '../../img/icons.svg';
import { View } from './View';

class ResultsView extends View {
  _parentEl = document.querySelector('.items');
  _errorMessage = 'No recipe found for your query. Please try again!';
  _message = '';

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach((e) => window.addEventListener(e, handler));
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

export default new ResultsView();
