import React, { PureComponent } from 'react';

import { NavLink } from 'react-router-dom';

import { withQuery, WithQueryProps } from '../../services/useQueryHoc';

import s from './NavBar.module.scss';

class Navbar extends PureComponent<WithQueryProps> {
  render() {
    const { loading, error, data } = this.props.queryCategoryName;
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
      <div className={s.navBar}>
        <ul className={s.list}>
          {data &&
            data.categories?.map(m => (
              <li key={m?.name} className={s.item}>
                <NavLink
                  to={`/${m?.name}`}
                  className={navData => (navData.isActive ? s.active : s.item)}
                >
                  {m?.name?.toUpperCase()}
                </NavLink>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default withQuery(Navbar);
