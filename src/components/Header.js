import React from 'react';
import logo from '../images/logo_header.svg';

class Header extends React.Component {
  render() {
    return (
      <header className="header">
      <img className="header__logo" alt="Место" src={logo}/>
    </header>
    );
  }
}

export default Header;