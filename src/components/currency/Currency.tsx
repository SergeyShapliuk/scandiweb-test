import React from 'react';

import downIcon from '../../assets/image/Vector.svg';
import s from '../navBar/NavBar.module.css';

function Currency() {
  return (
    <div className={s.currency}>
      <span>$</span>
      <img src={downIcon} alt="icon" />
    </div>
  );
}
export default Currency;
