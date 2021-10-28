// 28.2 Добавляем объект
const { Brand } = require("../models/models");
const ApiError = require("../error/ApiError");

// 23.2 создадим класс BrandController
class BrandController {
  async create(req, res) {
    const { name } = req.body;
    const brand = await Brand.create({ name });
    return res.json(brand);
  }
  async getAll(req, res) {
    const brands = await Brand.findAll();
    return res.json(brands);
  }
}

module.exports = new BrandController();
