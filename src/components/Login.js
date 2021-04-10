import React from 'react';

function Login({ onLogin}) {

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
    e.preventDefault();
    onLogin(userData)
    .catch(err => setMessage(err.message || 'Что-то пошло не так'));
  }

  return (
    <section className="auth">
      <form className="auth__form" name="sign-in" onSubmit={handleSubmit}>
        <h2 className="auth__title">Вход</h2>
        <input
          className="auth__input"
          id="email-sign-in"
          value={userData.email}
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleChange}
          required />
        <input
          className="auth__input"
          id="pass-sign-in"
          value={userData.password}
          name="password"
          placeholder="Пароль"
          type="password"
          onChange={handleChange}
          required />
        <span className="auth__error">{message}</span>
        <button className="auth__btn" type="submit">Войти</button>
      </form>
    </section>
  )
}

export default Login;