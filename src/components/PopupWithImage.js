import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._image = document.querySelector(".figure__img");
    this._nameImage = document.querySelector(".figure__img-name");
  }
  open(link, name) {
    super.open();
    this._image.src = link;
    this._image.alt = name;
    this._nameImage.textContent = name;
  }
}
