import icons from '../../img/icons.svg';

export class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentEl.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderSpinner = function () {
    const markup = `
    <div class="loading">
      <svg class="loading__icon">
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
    `;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  };

  renderError(message = this._errorMessage) {
    const markup = ` <div class="message">
      <svg class="message__icon">
        <use href="./src/img/icons.svg#icon-alert-triangle"></use>
      </svg>
      <div class="message__content">
        ${message}
      </div>
    </div>`;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = ` <div class="message">
      <svg class="message__icon">
        <use href="./src/img/icons.svg#icon-smile"></use>
      </svg>
      <div class="message__content">
        ${message}
      </div>
    </div>`;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }
}
