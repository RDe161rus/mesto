import './index.css';

import {
  classSelectorObj,
  popupEditProfile,
  formEditProfile,
  popupProfileOpenButton,
  popupAddCard,
  formAddCards,
  figurePopup,
/*   nameInput,
  textInput, */
  profileAddButton,
  cardContainer,
  profileAvatar,
  popupAvatar,
/*   avatarForm, */
  popupConfirm,
  btnDelCards
} from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupConfirm from '../components/PopupConfirm.js';
import Api from '../components/Api';

let userId;

const cardsSect = new Section(
  {
    renderer: data => {
      const cardElement = createCards(data);
      cardsSect.addItem(cardElement);
    }
  },
  cardContainer
);

const confirm = new PopupConfirm(popupConfirm);
confirm.setEventListeners();

function createCards(data) {
  const card = new Card(
    {
      name: data.name,
      link: data.link,
      likes: data.likes,
      userId,
      ownerId: data.owner._id,
      id: data._id
    },
    '.template-element',
    clickCard,
    async () => {
      try {
        const res = await api.like(data._id);
        card.like();
        card.setLikesCount(res.likes.length);
      } catch (err) {
        console.error(err)
      }
    },
    async () => {
      try {
        const res = await api.dislike(data._id);
        card.dislike();
        card.setLikesCount(res.likes.length);
      } catch (err) {
        console.error(err)
      }
    },
    () => {
      confirm.open();
      confirm.setCallback(handelCardDel);
    }
  );
  async function handelCardDel() {
    try {
      await api.deleteCard(data._id);
      card.delete();
      confirm.close();
    } catch (err) {
      console.error(err)
    }
  }
  return card.generateCard();
}

function clickCard(name, link) {
  popupWithImage.open(name, link);
}

const userInfo = new UserInfo({
  selectorName: '.profile__title',
  selectorInfo: '.profile__text',
  selectorAvatar: '.profile__avatar'
});

const popupForm = new PopupWithForm(popupEditProfile, handleProfileSubmitForm);
popupForm.setEventListeners();

async function handleProfileSubmitForm(data) {
  popupForm.renderLoading(true, 'Сохранение');
  try {
    const res = await api.editUserInfo(data);
    userInfo.setUserInfo(res);
    popupForm.close();
  } catch (err) {
    console.error(err);
  } finally {
    popupForm.renderLoading(false);
  }
}

function openEditPopupUserDate() {
  const userData = userInfo.getUserInfo();
  popupForm.setInputValues(userData);
  popupForm.open();
  formEditProfileValidator.enableValidation();
}
popupProfileOpenButton.addEventListener('click', openEditPopupUserDate);


const popupCard = new PopupWithForm(popupAddCard, handleCardFormSubmit);
popupCard.setEventListeners();

async function handleCardFormSubmit(data) {
  popupCard.renderLoading(true, 'Сохранение');
  try {
    const res = await api.addCards(data);
    const card = createCards(res);
    cardsSect.addItem(card);
    popupCard.close();
  } catch (err) {
    console.error(err);
  } finally {
    popupCard.renderLoading(false);
  }
}

profileAddButton.addEventListener('click', () => {
  popupCard.open();
  formAddCardsValidator.enableValidation();
});



const avatarPopup = new PopupWithForm(popupAvatar, handleAvatarFormSubmit);
avatarPopup.setEventListeners();
async function handleAvatarFormSubmit(data) {
  avatarPopup.renderLoading(true, 'Сохранение...');
  console.log(data);
  try {
    const res = await api.editAvatar(data);
    userInfo.setAvatar(res);
    avatarPopup.close();
  } catch (err) {
    console.error(err);
  } finally {
    avatarPopup.renderLoading(false);
  }
}

profileAvatar.addEventListener('click', () => {
  avatarPopup.open();
  formAvatarValidator.enableValidation();
});

const popupWithImage = new PopupWithImage(figurePopup);
popupWithImage.setEventListeners();
console.log(popupWithImage);

const formEditProfileValidator = new FormValidator(classSelectorObj, formEditProfile);
formEditProfileValidator.enableValidation();

const formAddCardsValidator = new FormValidator(classSelectorObj, formAddCards);
formAddCardsValidator.enableValidation();

const formAvatarValidator = new FormValidator(classSelectorObj, popupAvatar);
formAvatarValidator.enableValidation();



const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-72',
  headers: {
    authorization: '87d63540-4095-4028-b72b-2672dee97eab',
    'Content-Type': 'application/json'
  }
});

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cards, userData]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    cardsSect.renderItems(cards.reverse());
  })
  .catch((err) => 
    console.error(err)
  )
