const openedPopupBtn = document.querySelector('#opened-popup-btn');
const closePopupBtn = document.querySelector('#close-popup-btn');
const nameInput = document.querySelector('#name-input');
const textInput = document.querySelector('#text-input');
const editPopup = document.querySelector('#edit-popup');
const editForm = document.querySelector('#edit-form');
const profileTitle = document.querySelector('.profile__title');
const profileText = document.querySelector('.profile__text');
openedPopupBtn.addEventListener('click', function () {
  openedPopup(editPopup);
});
closePopupBtn.addEventListener('click', function () {
  closePopup(editPopup);
});
nameInput.value = profileTitle.textContent;
textInput.value = profileText.textContent;
editForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileText.textContent = textInput.value;
  closePopup(editPopup);
})
function openedPopup(popup) {
  popup.classList.add('popup_is-opened')
}
function closePopup(popup) {
  popup.classList.remove('popup_is-opened')
}
