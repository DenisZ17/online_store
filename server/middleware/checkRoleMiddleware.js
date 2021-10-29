const jwt = require("jsonwebtoken");

// 30 отсюда мы будем экспортировать функцию, которая принимает параметром роль. И уже из этой функции мы будем возвращать тот самый middleware(своего рода замыкание) Т.е. мы вызываем функцию, передаем туда роль, а она возвращает нам middleware

module.exports = function (role) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Не авторизован" });
      }
      // если токен есть, проверяем его на валидность. Первым параметром передаем сам токен, а вторым секретный ключ из env
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded.role !== role) {
        return res.status(403).json({ message: "нет доступа" });
      }
      req.user = decoded;
      next(); // этим мы вызываем следующий в цепочке middleware.
    } catch (e) {
      res
        .status(401)
        .json({ message: "Не авторизован из catch checkRoleMiddleware" });
    }
  };
};
// 31. Далее переходим в файл typeRouter, импортируем даннный middleware и вызываем его вторым параметром в функции post
