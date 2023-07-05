import { clickPopupImg } from "./index.js";
export class Card {
  constructor(date, selector){
    this._title = date.name;
    this._image = date.link;
    this._selector = selector;
    this._figureImg = document.querySelector('.figure__img');
    this._figureTitle = document.querySelector('.figure__img-name');
  }
  _getTemplate() {
      const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector('.element')
      .cloneNode(true);

      return cardElement;
  } 
  generateCard() {
    this._element = this._getTemplate();

    this._elementTitle = this._element.querySelector(".element__title");
    this._elementTitle.textContent = this._title;
    this._elementImg = this._element.querySelector(".element__img")
    this._elementImg.src = this._image;
    this._elementImg.alt = this._title;
    this._elementLike = this._element.querySelector(".element__button");
    this._elementDel = this._element.querySelector(".element__button-del");
    this._setEventListeners();
    return this._element;
  }
  _setEventListeners() {
    this._elementLike.addEventListener('click', () => this._handleClickLike());

    this._elementDel.addEventListener('click', () => this._handleDelElement());

    this._elementImg.addEventListener('click', () => this._openPopupClick());
  }

  _handleDelElement() {
    this._elementDel.addEventListener("click", () => this._element.remove());
  };

  _handleClickLike() {
    this._elementLike.classList.toggle("element__button_active");
  }; 

  _openPopupClick() {
      this._figureImg.src = this._image;
      this._figureImg.alt = this._title;
      this._figureTitle.textContent = this._title;
      clickPopupImg();
  };
}