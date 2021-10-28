class UserController {
  // 23.1 Добавим метод для регистрации пользователя

  async registration(req, res) {}
  // 23.1 Метод login
  async login(req, res) {}
  // 23.1 Метод, который проверяет авторизован ли пользователь
  async check(req, res) {}
}

// На выходе у нас из этого файла будет новый объект, созданный из этого класса
module.exports = new UserController();

// Откроем userRouter.js и туда импортируем данный контроллер
