import React, { PureComponent } from 'react';

import cartIcon from '../../assets/image/cart.svg';
import { Modal } from '../modal/Modal';

import s from './Cart.module.css';

class Cart extends PureComponent<any> {
  constructor(props: any) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  cartModal = () => {
    // @ts-ignore
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  render() {
    const { showModal }: any = this.state;
    return (
      <div className={s.cart} onClick={this.cartModal} aria-hidden>
        <img src={cartIcon} alt="logo" />
        {showModal && (
          <Modal>
            <div>moooodaaal</div>
            {/* {productCart ? <div className={s.cartCount}>{productCart}</div> : null} */}
          </Modal>
        )}
      </div>
    );
  }
}

export default Cart;
