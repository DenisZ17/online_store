// 18.1 Здесь мы получаем router из express
const Router = require("express");
// 18.2 Создаем объект этого роутера
const router = new Router();
// 18.3 Файлы в этой папке brandRouter.js, userRouter.js и т.д. будут грубо говоря являться подроутерами. Мы должны в основном роутере это указать. Для этого мы вызываем функцию use. Первым параметром указываем url по которому тот роутер будет отрабатывать, а вторым чуть позже передадим сам роутер

// 19. Все роутеры которые мы создали импортируем в данный файл
const deviceRouter = require("./deviceRouter");
const userRouter = require("./userRouter");
const brandRouter = require("./brandRouter");
const typeRouter = require("./typeRouter");

// 19.1 добавляем данные роутеры вторым параметром
router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/brand", brandRouter);
router.use("/device", deviceRouter);
// 19.2 на данном этапе мы объединили все 4 роутера в один, но наш сервер об этом ничего не знает, и ему об этом нужно сообщить. Возращаемся в корневой файл index.js

// 18. Теперь перейдем в каждый подроутер: brandRouter.js

// По итогу этот router мы экспортируем
module.exports = router;
