import { initialCards , classSelectorObj } from "./constants.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

//ОБРАЩЕНИЕ К POPUP-ПРОФИЛЯ
const popupEditProfile = document.querySelector("#edit-popup");
const nameInput = document.querySelector("#name-input");
const textInput = document.querySelector("#text-input");
const formEditProfile = document.querySelector("#edit-form");
//ОБРАЩЕНИЕ К КНОПКИ POPUP-ПРОФИЛЯ
const popupProfileOpenButton = document.querySelector("#opened-popup-btn");
const popupProfileCloseButton = document.querySelector("#close-popup-btn");
//ОБРАЩЕНИЕ К POPUP-ITEM

const popupAddCard = document.querySelector("#item-popup");
//ОБРАЩЕНИЕ К КНОПКИ ПРОФИЛЯ-ITEM
const profileAddButton = document.querySelector("#opened-add-button");
const buttonClosePopup = document.querySelector("#close-itemPopup-btn");
const formAddCards = document.querySelector("#item-form");
const nameItemInput = formAddCards.querySelector("#name-item-input");
const textItemInput = formAddCards.querySelector("#text-item-input");
const buttonToCreate = document.querySelector('#button-to-create');
//ОБРАЩЕНИЕ К ЗАГОЛОВКУ
const profileTitle = document.querySelector(".profile__title");
//ОБРАЩЕНИЕ К ПАРАГРОФУ
const profileText = document.querySelector(".profile__text");
//ОБРАЩЕНИЕ К КНОПКИ element__button(like)
const buttonLike = document.querySelector(".element__button");
//ОБРАЩЕНИЕ К template-element
const templateElements = document.querySelector("#template-element");
const templateContent = templateElements.content;
const elements = document.querySelector(".elements");
//ОБРАЩЕНИЕ К POPUP FIGURE
const figurePopup = document.querySelector("#figure-popup");
const figureClose = figurePopup.querySelector("#popup-close-btn-figure");

const formEditProfileValidator = new FormValidator(classSelectorObj, formEditProfile);
formEditProfileValidator.enableValidation();
const formAddCardsValidator = new FormValidator(classSelectorObj, formAddCards);
formAddCardsValidator.enableValidation();

//ОБРАЩЕНИЕ ПО НАЖАТИЮ НА КНОПКУ profile__edit-button
popupProfileOpenButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  textInput.value = profileText.textContent;
  
  formEditProfileValidator.resetValidation();
  openPopup(popupEditProfile);
});
//ОБРАЩЕНИЕ ПО НАЖАТИЮ НА КНОПКУ close-popup-btn
popupProfileCloseButton.addEventListener("click", () => closePopup(popupEditProfile));
//ОБРАЩЕНИЕ ПО НАЖАТИЮ НА КНОПКУ Сохранить
formEditProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileText.textContent = textInput.value;
  closePopup(popupEditProfile);
});
//ФУНКЦИЯ ОТКРЫТИЯ POPUP
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupEsc);
  popup.addEventListener("mousedown", closePopupOver);

}
//ФУНКЧИЯ ЗАКРЫТИЯ POPUP
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupEsc);
  popup.removeEventListener("mousedown", closePopupOver);
}
//ОБРАЩЕНИЕ ПО НАЖАТИЮ НА КНОПКУ profile__add-button
profileAddButton.addEventListener("click", () => {
  formAddCardsValidator.resetValidation();
  formAddCards.reset();
  openPopup(popupAddCard)
});
//ОБРАЩЕНИЕ ПО НАЖАТИЮ НА КНОПКУ close-itemPopup-btn
buttonClosePopup.addEventListener("click", () => {
  closePopup(popupAddCard)
});
//ОБРАЩЕНИЕ ПО НАЖАТИЮ НА КНОПКУ
export const clickPopupImg = () => {
  openPopup(figurePopup);
}
figureClose.addEventListener("click", () => {
  closePopup(figurePopup)
});

//закрытие по ESC
const closePopupEsc = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
};
//закрытие  оверлей
const closePopupOver = (evt) => {
  if (evt.target === evt.currentTarget) {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
};

//ДОБАВЛЕНИЕ СТАНДАРТ.КАРТ
initialCards.forEach((item) => {
  const card = new Card(item, '.template-element');
  const cardEl = card.generateCard();
  elements.append(cardEl);
});
//ДОБАВЛЕНИЕ НОВЫх КАРТ
formAddCards.addEventListener("submit", (evt) => {
  evt.preventDefault();
  closePopup(popupAddCard);
  
  const newCards = ({
    name: nameItemInput.value,
    link: textItemInput.value,
  });
  const newCard = new Card(newCards, '.template-element');
  const newCardEl = newCard.generateCard();

  elements.prepend(newCardEl);
  evt.target.reset();
});


