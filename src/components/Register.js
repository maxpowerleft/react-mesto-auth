import React from 'react';
import {Link} from 'react-router-dom';

function Register() {
  return (
    <section className="auth">
      <form className="auth__form" name="sign-up">
        <h2 className="auth__title">Регистрация</h2>
        <input className="auth__input" id="email-sign-up" name="email" placeholder="Email" type="email" required />
        <input className="auth__input" id="pass-sign-up" name="password" placeholder="Пароль" type="password" required />
        <button className="auth__btn" type="submit">"Зарегистрироваться"</button>
      </form>
      <Link exact to="/sign-in" className="auth__link">Уже зарегистрированы? Войти</Link>
    </section>
  )
}

export default Register;