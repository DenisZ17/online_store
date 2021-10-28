// 15.1 сюда мы импортируем объект sequelize, который мы создавали в файле db.js
const sequelize = require("../db");

// 15.2 из самого пакета sequelize нам понадобиться импортировать class DataType, при помощи которого описываются типы того или иного поля
const { DataTypes } = require("sequelize");

// 15.3 начнем описывать первую модель пользователя. У sequelize вызываем функцию define, передаем туда объект, а первым параметром указываем название этой модели, в данном случае 'user'
const User = sequelize.define("user", {
  // 15.4 внутри объекта описываем поля, которые будут у этой модели
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, //  описываем тип данных, это Integer, это будет первичные ключ и он будет автоинкрементироваться
  email: { type: DataTypes.STRING, unique: true }, // email - строковый и должен быть уникальным
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" }, // по умолчанию пользователь будет USER
});

// 15.5 создаем следующую модель называем Basket
const Basket = sequelize.define("basket", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // на внешние ключи не обращаем внимания, их sequelizer подставит сам
});

const BasketDevice = sequelize.define("basket_device", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Device = sequelize.define("device", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
  img: { type: DataTypes.STRING, allowNull: false },
});

const Type = sequelize.define("type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Brand = sequelize.define("brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Rating = sequelize.define("rating", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rate: { type: DataTypes.INTEGER, allowNull: false },
});

const DeviceInfo = sequelize.define("device_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
});

// 15.8  создаем связующую модель для 15.7.9  и инициализируем ее
const TypeBrand = sequelize.define("type_brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

// 15.6 опишем как модели связаны друг с другом. Для этого обращаемся к модели и вызываем соответствующую функцию: либо hasMany либо hasOne
// 15.7 начнем с User смотрим связи на диаграммах и переносим при помощи соответствующих функций
// 15.7.1 один пользователь имеет одну корзину
User.hasOne(Basket);
Basket.belongsTo(User);

// 15.7.2 Один пользователь можем иметь много оценок
User.hasMany(Rating);
Rating.belongsTo(User);

// 15.7.3 Одна корзина может иметь много basket_device
Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

// 15.7.4 Type может иметь много девайсов
Type.hasMany(Device);
Device.belongsTo(Type);

// 15.7.5 Brand может иметь много девайсов
Brand.hasMany(Device);
Device.belongsTo(Brand);

// 15.7.6 Brand может иметь много девайсов
Brand.hasMany(Device);
Device.belongsTo(Brand);

// 15.7.7 Device может иметь много рейтингов
Device.hasMany(Rating);
Rating.belongsTo(Device);

// 15.7.8.Device  может иметь много DeviceInfo
Device.hasMany(DeviceInfo, { as: "info" }); // as: info название у массива характеристик
DeviceInfo.belongsTo(Device);

// 15.7.9 Много брэндов может иметь много типов. Создадим связующую модель для типов Many и назовем ее TypeBrand
Type.belongsToMany(Brand, { through: TypeBrand }); // вторым аргументом передаем объект
Brand.belongsToMany(Type, { through: TypeBrand });

// 15.9 экспортируем все модели, чтобы в дальнейшем их можно было использовать в других файлах
module.exports = {
  User,
  Basket,
  BasketDevice,
  Device,
  Type,
  Brand,
  Rating,
  TypeBrand,
  DeviceInfo,
};
// 15.10 возвращаемся в файл index.js и импортируем эти модели
