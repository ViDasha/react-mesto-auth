import React from "react";

class InfoTooltip extends React.Component {
  render() {
    return(
      <div className={`popup ${this.props.isOpen && 'popup_opened'}`}>
          <div className="popup__overlay"></div>
          <div className="popup__container popup__container_type_form">
          <button onClick={this.props.onClose} type="button" aria-label="Закрыть" name="close" className="popup__close"></button>
          <img className="popup__icon" src={this.props.isSuccess ? "./images/success_icon.svg" : "./images/unsuccess_icon.svg"}/>
          <h2 className="popup__title">{this.props.isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз." }</h2>
          </div>
      </div>
    );
  }
}

export default InfoTooltip;