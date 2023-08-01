export const initialCards = [
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
];

export const classSelectorObj = {
  formSelector: ".form",
  inputSelector: ".input",
  submitButtonSelector: ".form__button",
  inputErrorClass: "input_type-error",
  errorClass: "form__input-error_active",
};

export const popupEditProfile = document.querySelector("#edit-popup");
export const nameInput = document.querySelector("#name-input");
export const textInput = document.querySelector("#text-input");
export const formEditProfile = document.querySelector("#edit-form");
export const popupProfileOpenButton = document.querySelector("#opened-popup-btn");
export const popupAddCard = document.querySelector("#item-popup");
export const profileAddButton = document.querySelector("#opened-add-button");
export const formAddCards = document.querySelector("#item-form");
export const figurePopup = document.querySelector("#figure-popup");
