const ApiError = require("../error/ApiError");
// 29.1 Импортируем bcrypt
const bcrypt = require("bcrypt");
// 29.1 Импортируем json web token
const jwt = require("jsonwebtoken");
// 29.1.1 Также нам понадобится модель пользователя, корзина
const { User, Basket } = require("../models/models");

// 29.3 поскольку генерировать токен нам придется и в функции логина создадим для этого отдельную функцию
// 29.3 вызываем функцию sign в нее первым параметром передается объект(тот самый payload - центральная часть JWT токена, в которую будут вшиваться какие-то данные). Туда мы передаем id-пользователя, email и его роль. Вторым параметром передается секретный ключ. Внесем его в переменную окружения и получим оттуда же.
const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

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
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }

  // 23.1 Метод login
  // 29.4 Реализовываем функцию логина. Здесь также из тела запроса получаем email, пароль. Сразу делаем деструктуризацию
  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({
      // проверяем есть ли пользователь с таким email
      where: { email },
    });
    if (!user) {
      // если такого пользователя нет, возвращаем ошибку
      return next(ApiError.internal("Пользователь не найден"));
    }
    // 29.4 Нам необходимо убедиться в том что, пароль соответствует. Учитывая, что в БД у нас лежит захешированный пароль, поэтому при помощи функции bcrypt сравниваем его с введенным паролем. Первым параметром передаем пароль, который написал пользователь, а второй получаем из базы данных
    let comparePassword = bcrypt.compareSync(password, user.password);
    // 29.4 Если пароли не совпадают возвращаем ошибку
    if (!comparePassword) {
      return next(ApiError.internal("Указан неверный пароль"));
    }
    // 29.4 Затем опять генерируем токен
    const token = generateJwt(user.id, user.email, user.role);
    // 29.4 И на клиент возвращаем сам токен
    return res.json({ token });
  }

  // 23.1 Метод, который проверяет авторизован ли пользователь
  // 29.5 Перед реализацией функции check, реализуем еще один middleware. В папке middleware создадим файл authmiddleware. Именно в нем мы будем декодировать токен и проверять его на валидность. Вся функция check будет сводиться к тому, чтобы сгенерировать новый токен и отправить его обратно на клиент, т.е. если пользователь постоянно использует свой аккаунт, токен у него будет перезаписываться
  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }
}

// На выходе у нас из этого файла будет новый объект, созданный из этого класса
module.exports = new UserController();

// Откроем userRouter.js и туда импортируем данный контроллер
