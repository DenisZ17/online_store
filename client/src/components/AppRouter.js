import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Context } from "..";
import { authRoutes, publicRoutes } from "../routes";
import { SHOP_ROUTE } from "../utils/consts";

const AppRouter = () => {
  const { user } = useContext(Context);
  console.log(user);
  return (
    <Switch>
      {
        /* Сделаем заглушку. Затем мы импортируем сюда массив с роутами, которые доступны только авторизованным пользователям. Пробегаемся по нему с помощью функции map. Сразу делаем деструктуризацию и вытаскиваем из объекта путь и компонент */
        user.isAuth &&
          authRoutes.map(({ path, Component }) => (
            /*Для каждого элемента массива мы отрисовываем Route, где указываем путь и компонент */
            <Route key={path} path={path} component={Component} exact />
          ))
      }
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} exact />
      ))}
      {/* Будет перенаправлять, если пользователь ввел в браузерной строке несуществующую страницу */}
      <Redirect to={SHOP_ROUTE} />
    </Switch>
  );
};
export default AppRouter;
