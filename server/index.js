/*
Установим зависимости:
- Установим Express - это фреймворк для написания бэкенда серверной части на Node.js (a Node.js это платформа, на которой можно делать бэкенд на JavaScript)
- Установим систему управления базами данных Postgresql и устанавливаем его модули pg и pg-hstore
- Устанавливаем sequelize - это технология которая позволяет связывать программный код с БД через функции
- Устанавливаем cors - это чтобы мы могли обращаться с нашего браузера на сервер
- Устанавливаем dotenv - чтобы задавать переменные окружения
- Установим nodemon - чтобы автоматическить перезапускать сервер
- В файле package.json запишем скрипт, который будет запускать приложение в режиме разработки: для этого в поле scripts пишем команду "dev": "nodemon index.js"
 */

// 8. Для того чтобы сервер мог считывать данный файл, нужно сюда импортировать config из модуля dotenv
require("dotenv").config();

// 1. при помощи require мы можем импортировать какие-то модули в файл, но в данном случае импортируем express
const express = require("express");

/* 9. Следующий этап сконфигурируем подключение к базе данных. Для этого создадим файл db.js и перейдем туда  */
// 9.7 импортируем объект из db.js
const sequelize = require("./db");

// 16. импортируем модели из models.js
const models = require("./models/models");

// 3. Укажем порт на котором наше приложение будет работать
// 7. теперь получать порт из переменной окружения мы будем через process.env.PORT, если такая переменная не задана нам будет возвращать порт 5000
const PORT = process.env.PORT || 7001;

// 2.создадим объект вызвав функцию express, с которой и будет начинаться запуск приложения
const app = express();
/* 10. Теперь необходимо вызвать функцию для подключения к БД. Мы назовем ее start, сделаем ее ассинхронной(поскольку все операции с БД являются асинхронными). Все это обернем в блок try-catch, чтобы отлавливать потенциально возможные ошибки */
const start = async () => {
  try {
    // 12. Теперь вызываем у импортируемого объекта функцию authenticate. С ее помощью будет устанавливаться подключение к БД, await обозначает, что функция асинхронная
    await sequelize.authenticate();

    // 13. Следующим этапом вызываем у этого объекта функцию sync. Эта функция будет сверять состояние БД со схемой данных, которую напишем чуть позже
    await sequelize.sync();

    // 10.1 вызов функции listen перенесем как раз в этот блок
    // 4. У app вызываем функцию listen в которой указываем какой порт должен прослушивать наш сервер, а вторым параметром передаем callback, который нам покажет что сервер стартовал
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

/* 5. В терминале запускаем скрипт, который мы прописывали в package.json - npm run dev и запускаем*/
/* 6. Объявлять порт статично не очень хорошая практика поэтому всю конфигурацию выносим в переменную окружения. Для этого создадим файл .env и в него запишем 'PORT=7000'*/
// 11. Незабываем эту функцию вызвать чтобы сервер у нас запустился
start();

// 14. Составим диаграммы таблиц: (device, user, rating, type, brand, backet и т.д.)
// 15. Перенесем диаграммы в наш проект и реализуем схему того как данные будут храниться в БД. Для этого создадим папку models, а в ней файл models.js, где мы будем описывать модели данных
