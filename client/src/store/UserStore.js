import { makeAutoObservable } from "mobx";

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = {};
    makeAutoObservable(this); // перерендерит компоненты в случае изменений
  }
  // создадим action - это функции, которые изменяют состояния
  setIsAuth(bool) {
    this._isAuth = bool;
  }

  setUser(user) {
    this._user = user;
  }

  // создадим одноименные геттеры. Они нужны, чтобы получать переменные из нашего состояния
  get isAuth() {
    return this._isAuth;
  }
  get user() {
    return this._user;
  }
}
