const ApiError = require("../error/ApiError");
// 29.1 Импортируем bcrypt
const bcrypt = require("bcrypt");
// 29.1 Импортируем json web token
const jwt = require("jsonwebtoken");
// 29.1.1 Также нам понадобится модель пользователя, корзина
const { User, Basket } = require("../models/models");

class UserController {
  // 23.1 Добавим метод для регистрации пользователя

  async registration(req, res, next) {
    // 29.2 Получаем из тела запроса email и пароль. Роль у нас носит второстепенный характер, она нигде не задается, поэтому ее мы тоже будем принимать в запросе, просто чтобы мы могли отдельно создавать пользователей и администраторов
    const { email, password, role } = req.body;
    //  29.2 сделаем небольшую проверку
    if (!email || !password) {
      // если какое-то из этих полей пустое возвращаем ошибку
      return next(ApiError.badRequest("Некорректный email или пароль"));
    }
    //  29.2 следующий этап проверить существует ли пользователь с таким email в системе
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      // если нашли такого пользователя бросаем ошибку
      return next(
        ApiError.badRequest("Пользователь с таким email уже существует")
      );
    }
    //  29.2 если пользователя мы не нашли тогда мы можем захешировать пароль и создать нового пользователя
    const hashPassword = await bcrypt.hash(password, 5); // первым параметром передаем сам пароль пользователя, а вторым сколько раз мы его будем хешировать
    //  29.2 следующим этапом с помощью функции create создаем пользователя. П
    const user = await User.create({ email, role, password: hashPassword });
    const basket = await Basket.create({ userId: user.id }); // сразу же для пользователя создаем корзину. Туда передаем id пользователя, которое мы можем получить уже из созданного объекта самого пользователя

    //  29.2 теперь сгенерируем JWT-токет
    const token = jwt.sign(
      { id: user.id, email, role },
      process.env.SECRET_KEY,
      {
        expiresIn: "24h",
      }
    ); // вызываем функцию sign в нее первым параметром передается объект(тот самый payload - центральная часть JWT токена, в которую будут вшиваться какие-то данные). Туда мы передаем id-пользователя, email и его роль. Вторым параметром передается секретный ключ. Внесем его в переменную окружения и получим оттуда же.
    return res.json({ token });
  }

  // 23.1 Метод login
  async login(req, res) {}
  // 23.1 Метод, который проверяет авторизован ли пользователь
  async check(req, res) {}
}

// На выходе у нас из этого файла будет новый объект, созданный из этого класса
module.exports = new UserController();

// Откроем userRouter.js и туда импортируем данный контроллер
