export default class Popup {
  constructor(selectorPopup) {
    this._popup = selectorPopup;
    this._buttonClose = selectorPopup.querySelector(".popup__close-btn");
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }
  open() {
    this._popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", (evt) => this._handleEscClose(evt));
    this._popup.addEventListener("mousedown", (evt) => this._handleOverClose(evt));
  }
  close() {
    this._popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", (evt) => this._handleEscClose(evt));
    this._popup.removeEventListener("mousedown", (evt) => this._handleOverClose(evt));
  }
  setEventListeners() {
    this._buttonClose.addEventListener("click", () => this.close());
    this._popup.addEventListener("click", (evt) => this._handleOverClose(evt));
  }
}
