import React from "react";

class Login extends React.Component {
  render() {
    return (
        <div>
        <h2 className="popup__title">Регистрация</h2>
        <form method="post" action="#" id={`${this.props.name}-form`} name="popup-form" className="popup__form" noValidate onSubmit={this.props.onSubmit}>
            <input id="pp-add-name" type="text" name="name"  ref={this.inputNameRef} className="popup__item" placeholder="E-mail" minLength="2" maxLength="30" required />
            <span className="pp-add-name-error popup__item-error"></span>
            <input id="pp-add-src" type="url" name="link"  ref={this.inputLinkRef} className="popup__item" placeholder="Пароль" required />
            <span className="pp-add-src-error popup__item-error"></span>
            <button id={`${this.props.name}-save`} type="submit" aria-label="Сохранить" name="save" className="popup__button-save">Войти</button>
        </form>
        </div>
    );
  }
}

export default Login; 