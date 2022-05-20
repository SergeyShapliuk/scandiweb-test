import React from 'react';

import preloader from '../../assets/preloader/preloader.gif';

import s from './Preloader.module.css';

function Preloader() {
  return (
    <div className={s.preloader}>
      <img src={preloader} alt="preloader" />
    </div>
  );
}

export default Preloader;
