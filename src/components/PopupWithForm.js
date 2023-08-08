import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, callbackSubmitForm) {
    super(selectorPopup);
    this._callbackSubmitForm = callbackSubmitForm;
    this._form = this._popup.querySelector(".form");
    this._inputList = this._form.querySelectorAll(".input");
    this._buttonSave = this._popup.querySelector('.form__button');
    this._buttonSaveText = this._buttonSave.textContent;
  }
  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((element) => {
      this._inputValues[element.name] = element.value;
    });
    return this._inputValues;
  }
  setInputValues(date) {
    this._inputList.forEach(input => {
      input.value = date[input.name]
    })
  }

  renderLoading(isLoading, text) {
    if (!isLoading) {
      this._buttonSave.textContent = this._buttonSaveText;
    } else {
      this._buttonSave.textContent = text;
    }
  }



  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._callbackSubmitForm(this._getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._form.reset();
  }
}
