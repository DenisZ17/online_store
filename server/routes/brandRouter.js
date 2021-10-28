const Router = require("express");
const brandController = require("../controllers/brandController");
const router = new Router();

// 18.1 Создаем метод POST по работе с брендами. Это для того чтобы создавать бренд
router.post("/", brandController.create);
// И будет второй метод GET чтобы все бренды получать. По хорошему нужно было бы добавить метод DELETE, чтобы удалять бренды
router.get("/", brandController.getAll);

module.exports = router;
