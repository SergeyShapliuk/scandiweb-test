import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { ProductCartType } from '../../generated/graphql';
import { clearCart } from '../../store/mainReducer/mainReducer';
import { RootStateType } from '../../store/rootStore/rootReducer';
import Cart from '../cart/Cart';

import s from './CartModal.module.scss';

type MapStateToProps = {
  productCart: ProductCartType[];
};
type CartModalType = MapStateToProps & {
  clearCart: () => void;
  onClickBg: () => void;
  showModal: boolean;
};

class CartModal extends PureComponent<CartModalType> {
  checkOut = () => {
    if (this.props.productCart.length) {
      this.props.clearCart();
      // eslint-disable-next-line no-alert
      alert('products has been bought successfully');
    }
    // eslint-disable-next-line no-alert
    alert('add some product');
  };

  render() {
    const { productCart, onClickBg, showModal } = this.props;

    return (
      <div className={s.cartModalBlock}>
        <div className={s.cartModalContainers}>
          <h4 className={s.title}>
            My Bag
            <span className={s.titleItems}>
              {`, ${productCart.length} item${productCart.length === 1 ? '' : 's'}`}
            </span>
          </h4>
          <Cart showModal={showModal} />
          <div className={s.buttons}>
            <NavLink to="/cart">
              <button type="button" onClick={onClickBg} className={s.viewBtn}>
                view bag
              </button>
            </NavLink>

            <button type="button" className={s.checkoutButton} onClick={this.checkOut}>
              check out
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state: RootStateType): MapStateToProps => ({
  productCart: state.main.productCart,
});
export default connect(mapStateToProps, { clearCart })(CartModal);
