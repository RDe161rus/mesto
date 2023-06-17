const classSelectorObj = {
  formSelector: ".form",
  inputSelector: ".input",
  submitButtonSelector: ".form__button",
  inputErrorClass: "input_type-error",
  errorClass: "form__input-error_active",
};
// добавляем классы с ошибками
const showInputError = (formElement, formInput, errorMessage, classSelectorObj) => {
  const formError = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.add(classSelectorObj.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(classSelectorObj.errorClass);
}
// удаляем классы с ошибками
const hideInputError = (formElement, formInput, classSelectorObj) => {
  const formError = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove(classSelectorObj.inputErrorClass);
  formError.textContent = "";
  formError.classList.remove(classSelectorObj.errorClass);
}
//пронеряем на валидность
const inputValidity = (formElement, formInput, classSelectorObj) => {
  if (!formInput.validity.valid) {
    showInputError(formElement, formInput, formInput.validationMessage, classSelectorObj);
  } else {
    hideInputError(formElement, formInput, classSelectorObj);
  }
};
//пронеряем все input на валидность
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
// ВКЛЮЧЕИНЕ ИЛИ ОТКЛЮЧЕНИЕ КНОПКИ
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.removeAttribute("disabled");
  }
};
//ОБРАБОТЧИК ДЛЯ ВСЕХ
const setEventListeners = (formElement, classSelectorObj) => {
  const inputList = Array.from(formElement.querySelectorAll(classSelectorObj.inputSelector));
  const buttonElement = formElement.querySelector(classSelectorObj.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, classSelectorObj);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      inputValidity(formElement, inputElement, classSelectorObj);
      toggleButtonState(inputList, buttonElement, classSelectorObj);
    });
  });
};
//ВОЛИДАЦИЯ ВСЕХ ФОРМ
const enableValidation = (classSelectorObj) => {
  const formList = Array.from(document.querySelectorAll(classSelectorObj.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, classSelectorObj);
  });
};
enableValidation(classSelectorObj);
