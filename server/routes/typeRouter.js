// 18.2 Для типов будет все идентично как и для брендов в 18.1

const Router = require("express");
const typeController = require("../controllers/typeController");
const router = new Router();

// Создаем метод POST по работе с брендами. Это для того чтобы создавать бренд
router.post("/", typeController.create);
// И будет второй метод GET чтобы все бренды получать. По хорошему нужно было бы добавить метод DELETE, чтобы удалять бренды
router.get("/", typeController.getAll);

module.exports = router;
