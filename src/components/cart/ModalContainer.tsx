import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import cartIcon from '../../assets/image/cart.svg';
import { ProductCartType } from '../../generated/graphql';
import { setProductCount } from '../../store/actionCreators';
import { RootStateType } from '../../store/rootStore';
import CartModal from '../../views/cartModal/CartModal';
import Modal from '../modal/Modal';

import s from './ModalContainer.module.css';

type MapStateToProps = {
  productCart: ProductCartType[];
  productsCount: number;
};
type MapDispatchToProps = {
  getProductCount: (count: number) => void;
};
type ModalContainerType = MapStateToProps & MapDispatchToProps;
class ModalContainer extends PureComponent<ModalContainerType, { showModal: boolean }> {
  constructor(props: ModalContainerType) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  componentDidUpdate(
    prevProps: Readonly<MapStateToProps & { getProductCount: (count: number) => void }>,
  ) {
    const count = this.props.productCart
      .map(m => m.count)
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    if (count !== prevProps.productsCount) {
      this.props.getProductCount(count);
    }
  }

  cartModalHandler = () => {
    // @ts-ignore
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  render() {
    const { showModal } = this.state;
    const { productsCount } = this.props;

    return (
      <>
        <div className={s.cart} onClick={this.cartModalHandler} aria-hidden>
          <img src={cartIcon} alt="logo" />
          {productsCount > 0 && <span className={s.countView}>{productsCount}</span>}
        </div>
        <Modal onClickBg={this.cartModalHandler} showModal={showModal}>
          <CartModal showModal={showModal} onClickBg={this.cartModalHandler} />
        </Modal>
      </>
    );
  }
}
const mapStateToProps = (state: RootStateType): MapStateToProps => ({
  productCart: state.main.productCart,
  productsCount: state.main.productsCount,
});
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToProps => ({
  getProductCount: (count: number) => dispatch(setProductCount(count)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
