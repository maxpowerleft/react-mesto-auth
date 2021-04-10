import React from 'react';
import logo from '../images/header-logo.svg';
import { Route, Link } from 'react-router-dom';

function Header(props) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип сервиса 'Место'" className="header__logo" />
      <Route path="/sign-up">
        <Link to="/sign-in" className="header__auth-link">Войти</Link>
      </Route>
      <Route path="/sign-in">
        <Link to="/sign-up" className="header__auth-link">Регистрация</Link>
      </Route>
      <Route exact path="/">
        <ul className="header__list">
          <li className="header___list-type">
            <p className="header__text">{props.userEmail}</p>
          </li>
          <li className="header___list-type">
            <Link to="/sign-in" className="header__auth-link header__auth-link_logout" onClick={props.handleLogout}>Выйти</Link>
          </li>
        </ul>
      </Route>
    </header>
  )
}

export default Header;