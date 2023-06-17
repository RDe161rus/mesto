//ОБРАЩЕНИЕ К POPUP-ПРОФИЛЯ
const popupEditProfile = document.querySelector("#edit-popup");
const nameInput = document.querySelector("#name-input");
const textInput = document.querySelector("#text-input");
const formEditProfile = document.querySelector("#edit-form");
//ОБРАЩЕНИЕ К КНОПКИ POPUP-ПРОФИЛЯ
const openedPopupBtn = document.querySelector("#opened-popup-btn");
const closePopupBtn = document.querySelector("#close-popup-btn");
//ОБРАЩЕНИЕ К POPUP-ITEM
const popupAddCard = document.querySelector("#item-popup");
//ОБРАЩЕНИЕ К КНОПКИ ПРОФИЛЯ-ITEM
const openedAddButton = document.querySelector("#opened-add-button");
const closeItemPopupBtn = document.querySelector("#close-itemPopup-btn");
const formAddCard = document.querySelector("#item-form");
const nameItemInput = formAddCard.querySelector("#name-item-input");
const textItemInput = formAddCard.querySelector("#text-item-input");
//ОБРАЩЕНИЕ К ЗАГОЛОВКУ
const profileTitle = document.querySelector(".profile__title");
//ОБРАЩЕНИЕ К ПАРАГРОФУ
const profileText = document.querySelector(".profile__text");
//ОБРАЩЕНИЕ К КНОПКИ element__button(like)
const buttonLike = document.querySelector(".element__button");
//ОБРАЩЕНИЕ К template-element
const templateElements = document.querySelector("#template-element");
const templateContent = templateElements.content;
const elementItem = templateContent.querySelector(".element");
const elements = document.querySelector(".elements");
//ОБРАЩЕНИЕ К POPUP FIGURE
const figurePopup = document.querySelector("#figure-popup");
const figureClose = figurePopup.querySelector("#popup-close-btn-figure");
const figureImg = figurePopup.querySelector(".figure__img");
const figureName = figurePopup.querySelector(".figure__img-name");
//ОБРАЩЕНИЕ ПО НАЖАТИЮ НА КНОПКУ profile__edit-button
openedPopupBtn.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  textInput.value = profileText.textContent;
  openPopup(popupEditProfile);
});

//ОБРАЩЕНИЕ ПО НАЖАТИЮ НА КНОПКУ close-popup-btn
closePopupBtn.addEventListener("click", () => closePopup(popupEditProfile));

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
  document.addEventListener("click", closePopupOver);
}
//ФУНКЧИЯ ЗАКРЫТИЯ POPUP
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupEsc);
  document.removeEventListener("click", closePopupOver);
}

//закрытие по ESC
const closePopupEsc = (evt) => {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (evt.key === "Escape") {
    closePopup(openedPopup);
  }
};
//закрытие  оверлей
const closePopupOver = () => {
  const openedPopup = document.querySelector(".popup_is-opened");
  openedPopup.addEventListener("click", (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(openedPopup);
    }
  });
};

//ОБРАЩЕНИЕ ПО НАЖАТИЮ НА КНОПКУ profile__add-button
openedAddButton.addEventListener("click", () => openPopup(popupAddCard));
//ОБРАЩЕНИЕ ПО НАЖАТИЮ НА КНОПКУ close-itemPopup-btn
closeItemPopupBtn.addEventListener("click", () => closePopup(popupAddCard));
//ОБРАЩЕНИЕ ПО НАЖАТИЮ НА КНОПКУ
figureClose.addEventListener("click", () => closePopup(figurePopup));

initialCards.forEach((item) => {
  const сard = createCard(item);
  elements.prepend(сard);
});

function createCard(item) {
  const card = elementItem.cloneNode(true);

  const elementTitle = card.querySelector(".element__title");
  elementTitle.textContent = item.name;

  const elementImgSrc = card.querySelector(".element__img");
  elementImgSrc.src = item.link;
  elementImgSrc.alt = item.name;

  const buttonLike = card.querySelector(".element__button");
  buttonLike.addEventListener("click", () =>
    buttonLike.classList.toggle("element__button_active")
  );

  const buttonDel = card.querySelector(".element__button-del");
  buttonDel.addEventListener("click", () => card.remove());

  elementImgSrc.addEventListener("click", () => {
    figureImg.src = item.link;
    figureImg.alt = item.name;
    figureName.textContent = item.name;
    openPopup(figurePopup);
  });

  return card;
}

formAddCard.addEventListener("submit", (evt) => {
  evt.preventDefault();

  closePopup(popupAddCard);

  const newCards = createCard({
    name: nameItemInput.value,
    link: textItemInput.value,
  });

  formAddCard.reset();
  elements.prepend(newCards);
});
