import React, { PureComponent } from 'react';

import s from './Modal.module.css';

type IModal = {
  enableBackground: boolean;
  onClickBg: () => void;
  showModal: boolean;
  children: any;
};

class Modal extends PureComponent<IModal> {
  render() {
    const { enableBackground, onClickBg, showModal, children } = this.props;
    if (!showModal) return null;
    return (
      <>
        {enableBackground && (
          <div className={s.modalContainer} onClick={onClickBg} aria-hidden />
        )}
        <div className={s.modal}> {children}</div>;
      </>
    );
  }
}

export default Modal;
