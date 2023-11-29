import icons from '../../img/icons.svg';
import { View } from './View';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.pagination__btn');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if (curPage === 1 && numPages > 1) {
      return `<div class="pagination__push"></div>
    <div data-goto="${curPage + 1}" class="pagination__btn pagination__right">
      <span> Page ${curPage + 1}</span>
      <svg class="pagination__icon">
        <use href="./src/img/icons.svg#icon-arrow-right"></use>
      </svg>
    </div>`;
    }

    if (curPage === numPages && numPages > 1) {
      return `
      <div data-goto="${curPage - 1}" class="pagination__btn pagination__left">
      <svg class="pagination__icon">
        <use href="./src/img/icons.svg#icon-arrow-left"></use>
      </svg>
      <span> Page ${curPage - 1} </span>
    </div>
    <div class="pagination__push"></div>`;
    }

    if (curPage < numPages) {
      return `
      <div data-goto="${curPage - 1}" class="pagination__btn pagination__left">
      <svg class="pagination__icon">
        <use href="./src/img/icons.svg#icon-arrow-left"></use>
      </svg>
      <span> Page ${curPage - 1} </span>
    </div>
    <div class="pagination__push"></div>
    <div data-goto="${curPage + 1}" class="pagination__btn pagination__right">
      <span> Page ${curPage + 1}</span>
      <svg class="pagination__icon">
        <use href="./src/img/icons.svg#icon-arrow-right"></use>
      </svg>
    </div>`;
    }

    return '';
  }
}

export default new PaginationView();
