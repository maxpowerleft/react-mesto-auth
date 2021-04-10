import React from 'react';
import logo from '../images/header-logo.svg';
import { Route, Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Логотип сервиса 'Место'" className="header__logo" />
      <Route exact path="/sign-up">
        <Link to="/sign-in" className="header__auth-link">Войти</Link>
      </Route>
      <Route exact path="/sign-in">
        <Link to="/sign-up" className="header__auth-link">Регистрация</Link>
      </Route>
    </header>
  )
}

export default Header;