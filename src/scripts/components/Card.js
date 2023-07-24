export class Card {
  constructor(date, selector, handleCardClick) {
    this._title = date.name;
    this._image = date.link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }
  generateCard() {
    this._element = this._getTemplate();

    this._elementTitle = this._element.querySelector(".element__title");
    this._elementImg = this._element.querySelector(".element__img");
    this._elementLike = this._element.querySelector(".element__button");
    this._elementDel = this._element.querySelector(".element__button-del");
    this._elementImg.src = this._image;
    this._elementImg.alt = this._title;
    this._elementTitle.textContent = this._title;
    this._setEventListeners();
    return this._element;
  }
  _setEventListeners() {
    this._elementLike.addEventListener("click", () => this._handleClickLike());

    this._elementDel.addEventListener("click", () => this._handleDelElement());

    this._elementImg.addEventListener("click", () =>
      this._handleCardClick(this._title, this._image)
    );
  }

  _handleDelElement() {
    this._elementDel.addEventListener("click", () => this._element.remove());
  }

  _handleClickLike() {
    this._elementLike.classList.toggle("element__button_active");
  }
}
