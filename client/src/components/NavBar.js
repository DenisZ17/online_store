import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Context } from "..";
import { NavLink } from "react-router-dom";
import { SHOP_ROUTE } from "../utils/consts";
import Container from "react-bootstrap/Container";
import { observer } from "mobx-react-lite";
import {} from "react-bootstrap/";

const NavBar = observer(() => {
  // здесь получаем user из контекста, поскольку, навбар будет отображаться по разному в зависимости авторизован ли user
  const { user } = useContext(Context);
  return (
    <Navbar bg="dark" variant="primary">
      <Container>
        <NavLink to={SHOP_ROUTE} style={{ color: "white" }} href="#home">
          КупиДевайс
        </NavLink>
        {user.isAuth ? (
          <Nav style={{ color: "white" }}>
            <Button className="m-1" variant={"outline-light"}>
              Админ панель
            </Button>
            <Button className="m-1" variant={"outline-light"}>
              Войти
            </Button>
          </Nav>
        ) : (
          <Nav style={{ color: "white" }}>
            <Button
              variant={"outline-light"}
              onClick={() => user.setIsAuth(true)}
            >
              Aвторизация
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});
export default NavBar;
