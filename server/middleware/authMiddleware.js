const jwt = require("jsonwebtoken");

// 29.5.1 Здесь мы будем декодировать токен и проверять его на валидность. Если токен не валидный, будем возвращать ошибку, что пользователь не авторизован
module.exports = function (req, res, next) {
  // здесь сделаем проверку, если method=Options, то пропускаем
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    // токен обычно помещают в header.authorization, выцепить сам токен, но в хэдер обычно помещают сначала тип токена, а потом сам токен. Поэтому нам по пробелу надо 2 этих слова отлепить и по первому индексу получить сам токет
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Не авторизован" });
    }
    // если токен есть, проверяем его на валидность. Первым параметром передаем сам токен, а вторым секретный ключ из env
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // следующим этапом к req.user добавим данные, которые мы вытащили из этого токена и во всех функциях этот user будет доступный
    req.user = decoded;
    next(); // этим мы вызываем следующий в цепочке middleware. Далее перейдем в файл userRouter, импортируем данный middleware, добавим authMiddleware вторым параметров в функцию get
  } catch (e) {
    res.status(401).json({ message: "Не авторизован из catch" });
  }
};
