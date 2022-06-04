import React from 'react';
import logo from '../images/logo_header.svg';

class Header extends React.Component {
  render() {
    let { email } = this.props.userData;
    return (
      <header className="header">
      <img className="header__logo" alt="Место" src={logo}/>
      <h2>{email}</h2>
    </header>
    );
  }
}

export default Header;