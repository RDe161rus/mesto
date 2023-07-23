import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, callbackSubmitForm) {
    super(selectorPopup);
    this._callbackSubmitForm = callbackSubmitForm;
    this._form = this._popup.querySelector(".form");
    
  }
  _getInputValues() {
    this._inputList = this._form.querySelectorAll(".input");

    this._inputValues = {};
    this._inputList.forEach(element => {
      this._inputValues[element.name] = element.value;
    });
    return this._inputValues;
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
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
