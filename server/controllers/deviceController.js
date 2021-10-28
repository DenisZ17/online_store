// 28.3.5 импортируем пакет uuid
const uuid = require("uuid");
// 28.3.7 импортируем модуль path
const path = require("path");
const { Device, DeviceInfo } = require("../models/models"); // 28.3.13 добавили DeviceInfo
const ApiError = require("../error/ApiError");
// 23.4 создадим класс DeviceController
class DeviceController {
  // 28.3.2
  async create(req, res, next) {
    try {
      const { name, price, brandId, typeId, info } = req.body;
      // 28.3.3 у каждого устройства есть картинка. Ее мы можем получить из поля files, но для этого необходимо установить специальный пакет express-fileupload.
      const { img } = req.files;
      // Его также необходимо импортировать и зарегистрировать, поэтому переходим в корневой index.js импортир и  регистрируем
      // 28.3.4 после того как файл мы получили нам нужно сгенерировать для него уникальное имя. Для этого установим пакет uuid и импортируем его
      // 28.3.6 вызываем функцию v4. Далее создадим еще одну папку в папке сервер, которую назовем static. В ее будем перемещать все файлы, которые будут передавать с клиента, а затем научим наш сервер, эти файлы отдавать как статику, чтобы мы через браузер могли эти файлы спокойно получать
      let filename = uuid.v4() + ".jpg";
      // 28.3.7 чтобы файл после получения в эту папку переместить вызовем функцию mv. Нам нужно указать путь. Для этого воспользуемся модулем path и импортируем его. Далее для него вызовем функцию resolve, которая адаптирует указанный путь к операционной системе. Первым параметром передаем __dirname (это путь до текущей папки с контроллерами). Затем вторым параметром указываем 2 точки, чтобы вернуться в указанную директорию назад. Третьим параметром передаем папку static. 4 параметром передаем имя файла. Таким образом мы переместим файл в папку static
      img.mv(path.resolve(__dirname, "..", "static", filename));

      // 28.3.14 Зададим условие: если info у нас есть(если мы передали его в теле запроса. Единственный момент, когда мы передаем какие-то данные через форм дату они у нас приходят в виде строки.)
      if (info) {
        info = JSON.parse(info); // мы этот массив будем парсить на фронте в json строку, а на бэке обратно перегонять в javascript объекты. Делается это с помощью функции parse
        info.forEach((i) => {
          // Затем после того как мы распарсили массив, с помощью функции forEach пробегаемся по нему и для каждого элемента массива вызываем функцию create.
          DeviceInfo.create({
            // Await мы не ставим намеренно, чтобы не блокировать весь поток. Пусть они создаются где-то там асинхронно.
            title: i.title, // В сам объект передаем заголовок. Его мы получаем из элемента итерации.
            description: i.description,
            deviceId: device.id, // не забываем указать deviceId. Id объекту присваивается после создания. Поэтому создание девайса перенесем до условия
          });
        });
      }

      // 28.3.8 следующим этапом, когда файл перемещен, нам необходимо создать сам девайс. Для этого импортируем models из папки models. Далее вызываем функцию create и передаем туда все характеристики. Характеристику rating мы не указываем по-сколько по умолчанию он будет установлен в 0
      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: filename,
      });
      // 28.3.9 После того как устройство мы создали обращаем информацию о нем обратно на клиент
      //
      return res.json(device);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getAll(req, res) {
    // 28.3.10 добавим параметр limit(количество девайсов на 1 странице) и page для ограничения количества девайсов
    let { brandId, typeId, limit, page } = req.query;
    // 28.3.11 зададим дефолтные значения. Если страница не указана сделаем ее первой, а количество девайсов по умолчанию 9
    page = page || 1;
    limit = limit || 9;

    // 28.3.12 посчитаем отступ, допустим мы перешли на вторую страницу и первых 9 товаров нужно пропустить
    let offset = page * limit - limit;

    // 28.3.3
    let devices;
    if (!brandId && !typeId) {
      // findAndCountAll эта функция нужна для пагинации
      devices = await Device.findAndCountAll({ limit, offset });
    }
    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }
    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }
    if (brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId, typeId },
        limit,
        offset,
      });
    }

    return res.json(devices);
  }
  async getOne(req, res) {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: "info" }],
    });
    return res.json(device);
  }
}

module.exports = new DeviceController();
