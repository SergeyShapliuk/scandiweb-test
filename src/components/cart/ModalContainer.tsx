import React, { PureComponent } from 'react';

import { connect } from 'react-redux';

import cartIcon from '../../assets/image/cart.svg';
import { ProductCartType } from '../../generated/graphql';
import { getProductCount } from '../../store/mainReducer/mainReducer';
import { RootStateType } from '../../store/rootStore/rootReducer';
import CartModal from '../../views/cartModal/CartModal';
import Modal from '../modal/Modal';

import s from './ModalContainer.module.css';

type MapStateToProps = {
  productCart: ProductCartType[];
  productsCount: number;
};
class ModalContainer extends PureComponent<
  MapStateToProps & { getProductCount: (count: number) => void }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  // componentDidMount() {
  //   console.log('compDidMOOOOunt');
  //   const count = this.props.productCart
  //     .map(m => m.count)
  //     .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  //   this.props.getProductCount(count);
  // }

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
    const { showModal }: any = this.state;
    const { productCart, productsCount } = this.props;
    console.log(productCart);
    return (
      <div>
        <div className={s.cart} onClick={this.cartModalHandler} aria-hidden>
          <img src={cartIcon} alt="logo" />
          {productsCount > 0 && <span className={s.countView}>{productsCount}</span>}
        </div>
        <Modal onClickBg={this.cartModalHandler} showModal={showModal}>
          <CartModal showModal={showModal} onClickBg={this.cartModalHandler} />
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state: RootStateType): MapStateToProps => ({
  productCart: state.main.productCart,
  productsCount: state.main.productsCount,
});
export default connect(mapStateToProps, { getProductCount })(ModalContainer);
