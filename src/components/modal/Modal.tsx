import React, { PureComponent } from 'react';

import s from './Modal.module.css';

type IModal = {
  onClickBg: () => void;
  showModal: boolean;
  children: any;
};

class Modal extends PureComponent<IModal> {
  render() {
    const { onClickBg, showModal, children } = this.props;
    if (!showModal) return null;
    return (
      <>
        <div className={s.modalContainer} onClick={onClickBg} aria-hidden />
        <div className={s.modal}> {children}</div>;
      </>
    );
  }
}

export default Modal;
