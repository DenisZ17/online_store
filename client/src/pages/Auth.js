import Button from "react-bootstrap/Button";
import React from "react";
import { Card, Container, Form, Row } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";

const Auth = () => {
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control className="mt-3" placeholder="Введите ваш email..." />
          <Form.Control className="mt-3" placeholder="Введите пароль..." />
        </Form>
        <Row className="d-flex justify-content-between mt-3 pl-3 ">
          {isLogin ? (
            <div className="col-5">
              Нет аккаунта?
              <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
            </div>
          ) : (
            <div className="col-5">
              Есть аккаунт?
              <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
            </div>
          )}

          {isLogin ? (
            <Button className="col-4 " variant={"outline-primary"}>
              Войти
            </Button>
          ) : (
            <Button className="col-4 " variant={"outline-primary"}>
              Регистрация
            </Button>
          )}
        </Row>
      </Card>
    </Container>
  );
};

export default Auth;
