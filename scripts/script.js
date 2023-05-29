//ОБРАЩЕНИЕ К POPUP-ПРОФИЛЯ
const editPopup = document.querySelector("#edit-popup");
//ОБРАЩЕНИЕ К POPUP-ITEM
const itemPopup = document.querySelector("#item-popup");
//ОБРАЩЕНИЕ К INPUT ПРОФИЛЯ
const nameInput = document.querySelector("#name-input");
//ОБРАЩЕНИЕ К TEXT ПРОФИЛЯ
const textInput = document.querySelector("#text-input");
//ОБРАЩЕНИЕ К ФОРМЕ ПРОФИЛЯ
const editForm = document.querySelector("#edit-form");
//ОБРАЩЕНИЕ К ЗАГОЛОВКУ
const profileTitle = document.querySelector(".profile__title");
//ОБРАЩЕНИЕ К ПАРАГРОФУ
const profileText = document.querySelector(".profile__text");
//ОБРАЩЕНИЕ К КНОПКИ ОТКРЫТИЕ ПРОФИЛЯ
const openedPopupBtn = document.querySelector("#opened-popup-btn");
//ОБРАЩЕНИЕ К КНОПКИ ЗАКРЫТИЯ ПРОФИЛЯ
const closePopupBtn = document.querySelector("#close-popup-btn");
//ОБРАЩЕНИЕ К КНОПКИ ОТКРЫТИЕ ПРОФИЛЯ-ITEM
const openedAddButton = document.querySelector("#opened-add-button");
//ОБРАЩЕНИЕ К КНОПКИ ЗАКРЫТИЯ ПРОФИЛЯ-ITEM
const closeItemPopupBtn = document.querySelector("#close-itemPopup-btn");
//ОБРАЩЕНИЕ К КНОПКИ element__button(like)
const buttonLike = document.querySelector(".element__button");

//ОБРАЩЕНИЕ К template-element
const templateElements = document.querySelector("#template-element");
const templateContent = templateElements.content;
const elementItem = templateContent.querySelector(".element");
const elements = document.querySelector(".elements");

const itemForm = document.querySelector("#item-form");
const nameItemInput = itemForm.querySelector("#name-item-input");
const textItemInput = itemForm.querySelector("#text-item-input");

//ОБРАЩЕНИЕ К POPUP FIGURE
const figurePopup = document.querySelector("#figure-popup");
const figureClose = figurePopup.querySelector("#popup-close-btn-figure");
const figureImg = figurePopup.querySelector(".figure__img");
const figureName = figurePopup.querySelector(".figure__img-name");

//ФУНКЦИЯ ОТКРЫТИЯ POPUP
function openedPopup(popup) {
  popup.classList.add("popup_is-opened");
}
//ФУНКЧИЯ ЗАКРЫТИЯ POPUP
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
}
//ОБРАЩЕНИЕ ПО НАЖАТИЮ НА КНОПКУ profile__edit-button
openedPopupBtn.addEventListener("click", () => openedPopup(editPopup));

nameInput.value = profileTitle.textContent;
textInput.value = profileText.textContent;
//ОБРАЩЕНИЕ ПО НАЖАТИЮ НА КНОПКУ close-popup-btn
closePopupBtn.addEventListener("click", () => closePopup(editPopup));
//ОБРАЩЕНИЕ ПО НАЖАТИЮ НА КНОПКУ profile__add-button
openedAddButton.addEventListener("click", () => openedPopup(itemPopup));
//ОБРАЩЕНИЕ ПО НАЖАТИЮ НА КНОПКУ close-itemPopup-btn
closeItemPopupBtn.addEventListener("click", () => closePopup(itemPopup));
//ОБРАЩЕНИЕ ПО НАЖАТИЮ НА КНОПКУ Сохранить
editForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileText.textContent = textInput.value;
  closePopup(editPopup);
});

initialCards.forEach((item) => {
  const newTodo = createTodo(item);
  elements.prepend(newTodo);
});

function createTodo(item) {
  const card = elementItem.cloneNode(true);

  const elementTitle = card.querySelector(".element__title");
  elementTitle.textContent = item.name;

  const elementImgSrc = card.querySelector(".element__img");
  elementImgSrc.src = item.link;

  const elementImgAlt = card.querySelector(".element__img");
  elementImgAlt.alt = item.name;

  const buttonLike = card.querySelector(".element__button");
  buttonLike.addEventListener("click", () =>
    buttonLike.classList.toggle("element__button_active")
  );

  const buttonDel = card.querySelector(".element__button-del");
  buttonDel.addEventListener("click", () => card.remove());

  figureClose.addEventListener("click", () => closePopup(figurePopup));

  elementImgSrc.addEventListener("click", () => {
    figureImg.src = item.link;
    figureImg.alt = item.name;
    figureName.textContent = item.name;
    openedPopup(figurePopup);
  });

  return card;
}

itemForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  closePopup(itemPopup);

  const newCards = createTodo({
    name: nameItemInput.value,
    link: textItemInput.value,
  });

  itemForm.reset();
  elements.prepend(newCards);
});
