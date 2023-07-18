import icons from 'url:../../img/icons.svg';
import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const button = e.target.closest('.btn--inline');
      if (!button) return;

      const goToPage = +button.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    //first page and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return this._generateButtonMarkup(currentPage);
    }
    //last page
    if (currentPage === numPages && numPages > 1) {
      return this._generateButtonMarkup(currentPage, 'prev');
    }
    //any page in between
    if (currentPage < numPages) {
      return [
        this._generateButtonMarkup(currentPage),
        this._generateButtonMarkup(currentPage, 'prev'),
      ].join('');
    }
    //page 1 and no other pages
    return '';
  }

  _generateButtonMarkup(currPage, type = 'next') {
    return `<button data-goto='${
      type === 'prev' ? currPage - 1 : currPage + 1
    }' class="btn--inline pagination__btn--${
      type === 'prev' ? 'prev' : 'next'
    }">
    ${
      type === 'prev'
        ? `<svg class="search__icon">
    <use href="${icons}#icon-arrow-left"></use>
</svg>`
        : ''
    }
    <span>Page ${type === 'prev' ? currPage - 1 : currPage + 1}</span>
    ${
      type === 'next'
        ? `<svg class="search__icon">
    <use href="${icons}#icon-arrow-right"></use>
</svg>`
        : ''
    }
</button>`;
  }
}

export default new PaginationView();
