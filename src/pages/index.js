import {
  initialCards,
  classSelectorObj,


  popupEditProfile,
  formEditProfile,
  popupProfileOpenButton,
  popupAddCard,
  formAddCards,
  nameItemInput,
  textItemInput,
  figurePopup,
  nameInput,
  textInput,
  buttonToCreate,
  profileTitle,
  profileText,
  templateElements,
  templateContent,
  elements,
  figureClose,
  profileAddButton,
  buttonClosePopup,
  popupProfileCloseButton,
} from "../scripts/utils/constants.js";

import { Card } from "../scripts/components/Card.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import  PopupWithImage  from "../scripts/components/PopupWithImage.js";
import  PopupWithForm  from "../scripts/components/PopupWithForm.js";
import  Section  from "../scripts/components/Section.js";
import  UserInfo  from "../scripts/components/UserInfo.js";

//ДОБАВЛЕНИЕ СТАНДАРТ.КАРТ
function createCards(item) {
  const card = new Card(item, ".template-element", clickCard);
  return card.generateCard();
}

const cards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCards(item);
      cards.addItem(cardElement);
    },
  },
  ".template-element"
);
cards.renderItems();
//ДОБАВЛЕНИЕ НОВЫх КАРТ
function createNewCard() {
  const newCards = {
    name: nameItemInput.value,
    link: textItemInput.value,
  };
  const newCard = createCards(newCards);
  cards.addItem(newCard);
  popupCard.close();
}
const popupWithImage = new PopupWithImage(figurePopup);
popupWithImage.setEventListeners();

function clickCard(name, link) {
  popupWithImage.open(name, link);
}

const userInfo = new UserInfo({
  selectorName: ".figure__img",
  selectorInfo: ".figure__img-name",
});

function handleProfileSubmitForm(date) {
  userInfo.setUserInfo(date);
  popupWithForm.close();
}

const popupWithForm = new PopupWithForm(popupEditProfile, handleProfileSubmitForm);
popupWithForm.setEventListeners();
popupProfileOpenButton.addEventListener("click", () => {
  popupWithForm.open();
  const userDate = userInfo.getUserInfo();
  nameInput.value = userDate.name;
  textInput.value = userDate.info;
  formEditProfileValidator.resetValidation();
});

const popupCard = new PopupWithForm(popupAddCard, createNewCard);
popupCard.setEventListeners();

popupProfileOpenButton.addEventListener("click", () => {
  popupCard.open();
  formAddCardsValidator.resetValidation();
});

//ВАЛИДАЦИЯ
const formEditProfileValidator = new FormValidator(classSelectorObj, formEditProfile);
formEditProfileValidator.enableValidation();
const formAddCardsValidator = new FormValidator(classSelectorObj, formAddCards);
formAddCardsValidator.enableValidation();
