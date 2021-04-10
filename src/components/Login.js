import React from 'react';

function Login() {
  return (
    <section className="auth">
      <form className="auth__form" name="sign-in">
        <h2 className="auth__title">Вход</h2>
        <input className="auth__input" id="email-sign-in" name="email" placeholder="Email" type="email" required />
        <input className="auth__input" id="pass-sign-in" name="password" placeholder="Пароль" type="password" required />
        <button className="auth__btn" type="submit">"Войти"</button>
      </form>
    </section>
  )
}

export default Login;