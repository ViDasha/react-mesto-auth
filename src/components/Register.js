import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onRegister(this.props.password, this.props.email);
  }

  render(){
    return (
      <div className="register">
        <h2 className="popup__title popup__title_theme_dark">Регистрация</h2>
        <form method="post" action="#" id="register-form" name="popup-form" className="popup__form" noValidate onSubmit={this.handleSubmit}>
          <input id="email" name="email" type="email" className="popup__item" placeholder="E-mail" minLength="2" maxLength="40" required value={this.state.email} onChange={this.handleChange} />
          <span className="email-error popup__item-error"></span>
          <input id="password" name="password" type="password" className="popup__item" placeholder="Пароль" minLength="2" maxLength="40" required value={this.state.password} onChange={this.handleChange} />
          <span className="password-error popup__item-error"></span>
          <button type="submit" aria-label="Зарегистрироваться" name="save" className="popup__button-save">Зарегистрироваться</button>
        </form>
        <div className="register__signin">
          <p>Уже зарегистрированы?</p>
          <Link to="signin" className="register__login-link">Войти</Link>
        </div>
      </div>
  );
  }

}

export default withRouter(Register);
