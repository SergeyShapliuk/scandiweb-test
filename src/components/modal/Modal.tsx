import React, { PureComponent } from 'react';

import s from './Modal.module.css';

export class Modal extends PureComponent<any> {
  render() {
    return <div className={s.modalContainer}>{this.props.children}</div>;
  }
}
