import React, { PureComponent } from 'react';

import cartIcon from '../../assets/image/cart.svg';
import CartModal from '../../views/cartModal/CartModal';
import Modal from '../modal/Modal';

import s from './ModalContainer.module.css';

class ModalContainer extends PureComponent {
  constructor(props: any) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  cartModalHandler = () => {
    // @ts-ignore
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  render() {
    const { showModal }: any = this.state;
    return (
      <div className={s.cart} onClick={this.cartModalHandler} aria-hidden>
        <img src={cartIcon} alt="logo" />
        {showModal && (
          <Modal
            enableBackground
            onClickBg={() => showModal(false)}
            showModal={showModal}
          >
            <CartModal />
          </Modal>
        )}
      </div>
    );
  }
}

export default ModalContainer;
