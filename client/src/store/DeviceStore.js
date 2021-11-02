import { makeAutoObservable } from "mobx";

export default class DeviceStore {
  constructor() {
    this._types = [
      { id: 1, name: "Холодильники" },
      { id: 2, name: "Смартфоны" },
      { id: 3, name: "Компьютеры" },
      { id: 4, name: "Мониторы" },
      { id: 5, name: "Принтеры" },
    ];
    this._brands = [
      { id: 1, name: "Samsung" },
      { id: 2, name: "Apple" },
      { id: 3, name: "Atlant" },
      { id: 4, name: "LG" },
      { id: 5, name: "HP" },
      { id: 6, name: "Xiaomi" },
    ];
    this._devices = [
      {
        id: 1,
        name: "Iphone 12 pro",
        price: 4232,
        rating: 5,
        img: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/a4942085743111.5d84b89cecf37.jpg",
      },
      {
        id: 2,
        name: "Iphone 12 pro",
        price: 4232,
        rating: 5,
        img: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/a4942085743111.5d84b89cecf37.jpg",
      },
      {
        id: 3,
        name: "Iphone 12 pro",
        price: 4232,
        rating: 5,
        img: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/a4942085743111.5d84b89cecf37.jpg",
      },
      {
        id: 4,
        name: "Iphone 12 pro",
        price: 4232,
        rating: 5,
        img: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/a4942085743111.5d84b89cecf37.jpg",
      },
    ];
    this._selectedType = {};
    this._selectedBrand = {};
    makeAutoObservable(this);
  }

  setTypes(types) {
    this._types = types;
  }
  setBrands(brands) {
    this._brands = brands;
  }
  setDevices(devices) {
    this._devices = devices;
  }
  setSelectedType(type) {
    this._selectedType = type;
  }
  setSelectedBrand(brand) {
    this._selectedBrand = brand;
  }

  get types() {
    return this._types;
  }
  get brands() {
    return this._brands;
  }
  get devices() {
    return this._devices;
  }
  get selectedType() {
    return this._selectedType;
  }
  get selectedBrand() {
    return this._selectedBrand;
  }
}
