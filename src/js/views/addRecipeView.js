import icons from 'url:../../img/icons.svg';
import View from './View.js';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _buttonOpen = document.querySelector('.nav__btn--add-recipe');
  _buttonClose = document.querySelector('.btn--close-modal');
  _message = 'Recipe uploaded successfully! 👏🏻';

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._buttonOpen.addEventListener('click', this.toggleWindow.bind(this)); // this in a handler is the component it's added to
  }

  _addHandlerHideWindow() {
    this._buttonClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArray = [...new FormData(this)];
      const data = Object.fromEntries(dataArray);
      handler(data);
    });
  }

  _generateMarkup() {}

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

export default new AddRecipeView();
