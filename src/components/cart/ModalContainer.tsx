import React, { PureComponent } from 'react';

import { connect } from 'react-redux';

import cartIcon from '../../assets/image/cart.svg';
import { ProductCartType } from '../../generated/graphql';
import { RootStateType } from '../../store/rootStore/rootReducer';
import CartModal from '../../views/cartModal/CartModal';
import Modal from '../modal/Modal';

import s from './ModalContainer.module.css';

type MapStateToProps = {
  productCart: ProductCartType[];
};
class ModalContainer extends PureComponent<MapStateToProps, {}> {
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
    const { productCart } = this.props;
    const countProduct = productCart.map(m => m.count);
    const countProducts = countProduct.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0,
    );
    return (
      <div className={s.cart} onClick={this.cartModalHandler} aria-hidden>
        <img src={cartIcon} alt="logo" />
        {countProducts > 0 && <span className={s.countView}>{countProducts}</span>}
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
const mapStateToProps = (state: RootStateType): MapStateToProps => ({
  productCart: state.main.productCart,
});
export default connect(mapStateToProps, {})(ModalContainer);
