export default class UserInfo {
  constructor({ selectorName, selectorInfo, selectorAvatar }) {
    this._name = document.querySelector(selectorName);
    this._info = document.querySelector(selectorInfo);
    this._avatar = document.querySelector(selectorAvatar);
  }
  getUserInfo() {
    return { name: this._name.textContent, about: this._info.textContent, avatar: this._avatar.src };
  }
  setUserInfo(data) {
    if (data.name) this._name.textContent = data.name;
    if (data.about) this._info.textContent = data.about;
    this.setAvatar(data);
  }
  setAvatar(data) {
    if (data.avatar) this._avatar.src = data.avatar;
    if (data.name) this._avatar.alt = data.name;
  }
}
