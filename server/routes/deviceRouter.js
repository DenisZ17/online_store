// 18.4 Для девайса будут те же методы на создание и получение
const Router = require("express");
const deviceController = require("../controllers/deviceController");
const router = new Router();

router.post("/", deviceController.create);
router.get("/", deviceController.getAll);
// но добавляется еще один, чтобы получить конкретный отдельно взятый девайс, после того как мы перешли на страницу подробной информации
router.get("/:id", deviceController.getOne);

module.exports = router;
// теперь возвращаемся в routers/index.js
