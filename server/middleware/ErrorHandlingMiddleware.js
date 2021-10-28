// 24. class для обработки ошибок. Class будет расширять Error
class ApiError extends Error {
  // создаем конструктор, параметрами будут status ошибки и сообщение, которое будет возвращаться на client
  constructor(status, message) {
    // вызываем родительский конструктор с помощью функции super
    super();
    // И здесь присваиваем то, что получаем параметрами
    this.status = status;
    this.message = message;
  }
  // создадим пару статических методов, это методы которые можно вызывать без создания объекта
  static badRequest(message) {
    return new ApiError(404, message);
  }
  static internal(message) {
    return new ApiError(500, message);
  }
  static forbidden(message) {
    return new ApiError(403, message);
  }
}
module.exports = ApiError;
