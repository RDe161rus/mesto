export class FormValidator {
  constructor(classSelectorObj, formElement) {
    this._classSelectorObj = classSelectorObj;
    this._formElement = formElement;
    this._formSelector = classSelectorObj.formSelector;
    this._inputSelector = classSelectorObj.inputSelector;
    this._submitButtonSelector = classSelectorObj.submitButtonSelector;
    this._inputErrorClass = classSelectorObj.inputErrorClass;
    this._errorClass = classSelectorObj.errorClass;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
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
  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  // ВКЛЮЧЕИНЕ ИЛИ ОТКЛЮЧЕНИЕ КНОПКИ
  _toggleButtonState = () => {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.setAttribute("disabled", true);
    } else {
      this._buttonElement.removeAttribute("disabled");
    }
  };

  //ОБРАБОТЧИК ДЛЯ ВСЕХ
  _setEventListeners = () => {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._handlerInputValidity(inputElement)
        this._toggleButtonState();
      })
    })
  };
  resetValidation = () => {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    })
    this._toggleButtonState();
  };
  //ВОЛИДАЦИЯ ВСЕХ ФОРМ
  enableValidation = () => {
    this._setEventListeners();
  };
};
