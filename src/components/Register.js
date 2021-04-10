import React from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {

  const [userData, setUserData] = React.useState({
    email: '',
    password: ''
  })

    const [message, setMessage] = React.useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    })
  }

  function handleSubmit(e) {
    let { email, password } = userData;
    e.preventDefault();
    onRegister({ email, password })
      .catch(err => setMessage(err.message || 'Что-то пошло не так')
    )
  }


  return (
    <section className="auth">
      <form className="auth__form" name="sign-up" onSubmit={handleSubmit}>
        <h2 className="auth__title">Регистрация</h2>
        <input className="auth__input" id="email-sign-up" value={userData.email} name="email" placeholder="Email" type="email" onChange={handleChange} required />
        <input className="auth__input" id="pass-sign-up" value={userData.password} name="password" placeholder="Пароль" type="password" onChange={handleChange} required />
        <span className="auth__error">{message}</span>
        <button className="auth__btn" type="submit">Зарегистрироваться</button>
      </form>
      <Link exact to="/sign-in" className="auth__link">Уже зарегистрированы? Войти</Link>
    </section>
  )
}

export default Register;