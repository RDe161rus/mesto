import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor(popup) {
    super(popup);
    this._confirmBtn = this._popup.querySelector('.form__button');
  }
  setCallback(submit) {
    this._handleSub = submit;
  }
  setEventListeners() {
    super.setEventListeners();
    this._confirmBtn.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleSub();
    });
  }
}