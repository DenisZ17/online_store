// 28.1 Научимся добавлять в базу данный объекты
// 28.1.2 импортируем в typeControler модель type
const { Type } = require("../models/models");
// 28.1.3 импортируем сюда ApiError
const ApiError = require("../error/ApiError");

// 23.3 создадим класс TypeController
class TypeController {
  async create(req, res) {
    // 28.1.4 делаем деструктруризацию и из тела запроса, поскольку это POST запрос, извлекаем название этого типа и
    const { name } = req.body;
    // и из тела запроса, поскольку это POST запрос, извлекаем название этого типа и затем при помощи функции create этот тип мы создаем. Поскольку эта функция асинхронная мы добавляем await
    const type = await Type.create({ name });
    return res.json(type);
  }

  async getAll(req, res) {
    // 28.1.5 поучимся получать типы. Создаем переменную называем ее types. И у модели Type вызываем функцию findAll, которая вернет нам все существующие записи, которые есть в базе данных
    const types = await Type.findAll();
    return res.json(types);
    // 28.1.6 повторим данную логику на бренде
  }
}

module.exports = new TypeController();
