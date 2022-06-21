import React, { PureComponent } from 'react';

import { NavLink } from 'react-router-dom';

import welcome from '../../assets/image/welcom.jpeg';

class Welcome extends PureComponent {
  render() {
    return (
      <NavLink to="/all">
        <img src={welcome} className="image" alt="Welcome to the shop" />
      </NavLink>
    );
  }
}
export default Welcome;
