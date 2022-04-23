import React, { PureComponent } from 'react';

import logoIcon from '../../assets/image/logo.svg';
import Cart from '../cart/Cart';
import Currency from '../currency/Currency';
import Navbar from '../navBar/Navbar';

import s from './Header.module.css';

class Header extends PureComponent<any> {
  render() {
    return (
      <div className={s.header}>
        <Navbar />
        <img src={logoIcon} alt="logo" />
        <Currency />
        <Cart />
      </div>
    );
  }
}

export default Header;
