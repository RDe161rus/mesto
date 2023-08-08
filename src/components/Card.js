export class Card {
  constructor(data, selector, openImage, like, dislike, deleteCard) {
    this._image = data.link;
    this._title = data.name;
    this._id = data.id;
    this._userId = data.userId;
    this._likes = data.likes;
    this._ownerId = data.ownerId;
    this._like = like;
    this._dislike = dislike;
    this._selector = selector;
    this._openImage = openImage;
    this._deleteCard = deleteCard;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._card = this._getTemplate();

    this._elementTitle = this._card.querySelector('.element__title');
    this._elementTitle.textContent = this._title;

    this._elementImg = this._card.querySelector('.element__img');
    this._elementImg.src = this._image;
    this._elementImg.alt = this._title;

    this._elementLike = this._card.querySelector('.element__button');
    this._likeCounter = this._card.querySelector('.like-counter__card');
    this._likeCounter.textContent = this._likes.length;
    this._elementDel = this._card.querySelector('.element__button-del');

    this._setEventListeners();
    this._setLikeState();
    this._checkDelBtn();
    return this._card;
  }

  _setEventListeners() {
    this._elementDel.addEventListener('click', this._handleDelElement.bind(this));

    this._elementLike.addEventListener('click', this._handleCardLike.bind(this));

    this._elementImg.addEventListener('click', this._handleCardClick.bind(this));
  }

  _handleDelElement() {
    this._deleteCard(this._id);
  }

  _handleCardLike() {
    if (!this._elementLike.classList.contains('element__button_active')) {
      this._like();
    } else {
      this._dislike();
    }
  }
  _handleCardClick() {
    this._openImage(this._image, this._title);
  }

  _checkDelBtn() {
    if (this._userId !== this._ownerId) {
      this._elementDel.remove();
      this._elementDel = null;
    }
  }
  _setLikeState() {
    const isLiked = this._likes.some(user => user._id === this._userId);
    if (!isLiked) {
      this._dislike();
    } else {
      this._like();
    }
  }
  like() {
    this._elementLike.classList.add('element__button_active');
  }
  dislike() {
    this._elementLike.classList.remove('element__button_active');
  }
  delete() {
    this._card.remove();
    this.card = null;
  }
  setLikesCount(count) {
    this._likeCounter.textContent = count;
  }
}
