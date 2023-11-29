import icons from '../../img/icons.svg';
import { View } from './View';

class AddRecipeView extends View {
  _parentEl = document.querySelector('.modal__body');
  _model = document.querySelector('#modal');
  _modelContent = document.querySelector('.modal__content');
  _openBtn = document.querySelector('#add-recipe');
  _closeBtn = document.querySelector('.modal__close');

  _errorMessage = 'No recipe found for your query. Please try again!';
  _message = 'Recipe was successfully uploaded!';

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow = function () {
    this._model.classList.toggle('hidden');
  };

  _addHandlerShowWindow() {
    this._openBtn.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._closeBtn.addEventListener('click', this.toggleWindow.bind(this));
    window.addEventListener('click', (e) => {
      if (e.target === this._model) this.toggleWindow();
    });
  }

  addHandlerUpload(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupRecipeItem).join('');
  }
}

export default new AddRecipeView();
