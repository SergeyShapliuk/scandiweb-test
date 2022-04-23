import React, { PureComponent } from 'react';

import { NavLink } from 'react-router-dom';

import { withQuery } from '../../services/useQueryHoc';

import s from './NavBar.module.css';

class Navbar extends PureComponent<any> {
  render() {
    const { loading, error, data } = this.props.queryCategoryName;
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
      <div className={s.navBar}>
        {data &&
          data.categories?.map((m: any) => (
            <NavLink to={`/${m.name}`} key={m.name}>
              {m.name.toUpperCase()}
            </NavLink>
          ))}
      </div>
    );
  }
}

export default withQuery(Navbar);
