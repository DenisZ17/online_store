const Router = require("express");
const router = new Router();
// 23.1.1 Импортируем из userController.js
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// 18.3 Здесь запросы будут немного отличаться. Здесь будет два POST метода: регистрация и авторизация
// 23.1.2 теперь в каждый post или get метод вторым параметром передаем соответствующую функцию
router.post("/registration", userController.registration);
router.post("/login", userController.login);
// И также будет один метод GET при помощи которого мы будем проверять авторизован ли пользователь. Это будет делаться по GWT токену
router.get("/auth", authMiddleware, userController.check);

module.exports = router;
