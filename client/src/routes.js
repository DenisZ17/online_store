import Admin from "./pages/Admin";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  DEVICE_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from "./utils/consts";
import Auth from "./pages/Auth";
import Shop from "./pages/Shop";
import Basket from "./pages/Basket";
import DevicePage from "./pages/DevicePage";
// F4.1. здесь будут описаны все маршруты к конкретным страницам, которые есть в нашем приложении
// F4.1. здесь у нас будет 2 массива
// F4.1. Массив authRoutes будет список маршрутов только для тех страниц, к которым имеет доступ авторизованный пользователь
export const authRoutes = [
  // добавляем объект. У каждого объекта будет путь(это ссылка по которой та или иная страница будет отрабатывать) и компонент, это непосредственно сама страница (path находится в utils/consts.js)
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
  {
    path: BASKET_ROUTE,
    Component: Basket,
  },
];

// F4.1. Массив publicRoutes на эти маршруты может перейти абсолютно любой пользователь
export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    Component: Shop,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: DEVICE_ROUTE + "/:id",
    Component: DevicePage,
  },
];
