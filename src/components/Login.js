import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as auth from './Auth.js';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      password: '',
      email: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(e) {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e){
    e.preventDefault();
    if (!this.state.email || !this.state.password){
      return;
    }
    auth.authorize( this.state.password, this.state.email)
    .then((data) => {
      localStorage.setItem("jwt", data.token);
      if (data.jwt){
        this.setState({password: '', email: ''} ,() => {
            this.props.handleLogin();
            this.props.history.push('/');
        })
      }  
    })
    .catch(err => console.log(err)); // запускается, если пользователь не найден
  }
  render(){
    return(
      <div className="login">
        <h2 className="popup__title popup__title_theme_dark">Вход</h2>
        <form method="post" action="#" id="authorize-form" name="authorize-form" className="popup__form" noValidate onSubmit={this.handleSubmit}>
          <input id="email" name="email" type="email" className="popup__item" placeholder="E-mail" minLength="2" maxLength="40" required value={this.state.email} onChange={this.handleChange} />
          <span className="email-error popup__item-error"></span>
          <input id="password" name="password" type="password" className="popup__item" placeholder="Пароль" minLength="2" maxLength="40" required value={this.state.password} onChange={this.handleChange} />
          <span className="password-error popup__item-error"></span>
          <button type="submit" aria-label="Войти" name="save" className="popup__button-save">Войти</button>
        </form>
      </div>
    )
  }
}

export default withRouter(Login);

