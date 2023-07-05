export class FormValidator {
  constructor(classSelectorObj, formElement) {
    this._formElement = formElement;
    this._formSelector = classSelectorObj.formSelector;
    this._inputSelector = classSelectorObj.inputSelector;
    this._submitButtonSelector = classSelectorObj.submitButtonSelector;
    this._inputErrorClass = classSelectorObj.inputErrorClass;
    this._errorClass = classSelectorObj.errorClass;
  };
  // добавляем классы с ошибками
  _showInputError = (formInput, errorMessage) => {
    const formError = this._formElement.querySelector(`.${formInput.id}-error`);
    formInput.classList.add(this._inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(this._errorClass);
  };

  // удаляем классы с ошибками
  _hideInputError = (formInput) => {
    const formError = this._formElement.querySelector(`.${formInput.id}-error`);
    formInput.classList.remove(this._inputErrorClass);
    formError.textContent = "";
    formError.classList.remove(this._errorClass);
  }

  //пронеряем на валидность
  _handlerInputValidity = (formInput) => {
    if (!formInput.validity.valid) {
      this._showInputError(formInput, formInput.validationMessage);
    } else {
      this._hideInputError(formInput);
    }
  };

  //пронеряем все input на валидность
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  // ВКЛЮЧЕИНЕ ИЛИ ОТКЛЮЧЕНИЕ КНОПКИ
  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.setAttribute("disabled", true);
    } else {
      buttonElement.removeAttribute("disabled");
    }
  };

  //ОБРАБОТЧИК ДЛЯ ВСЕХ
  _setEventListeners = () => {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._handlerInputValidity(inputElement)
        this._toggleButtonState(inputList, buttonElement);
      })
    })
  };

  //ВОЛИДАЦИЯ ВСЕХ ФОРМ
  enableValidation = () => {
    this._setEventListeners();
  };
};
