import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Dispatch } from 'redux';

import cart from '../../assets/image/cart-white.svg';
import Modal from '../../components/modal/Modal';
import { AttributeSet, ProductCartType } from '../../generated/graphql';
import { getAttributeSet, getCurrency } from '../../services/selectors';
import { setProductToCart } from '../../store/actionCreators';
import { RootStateType } from '../../store/rootStore';
import AttributeModal from '../modalAttributes/AttributeModal';

import s from './Product.module.scss';

type MapStateToProps = {
  currency: string;
  attributeSet: AttributeSet[];
};
type MapDispatchToProps = {
  addProductCart: (product: ProductCartType) => void;
};
type ProductTypes = {
  product: any;
  name: string;
} & MapStateToProps &
  MapDispatchToProps;

class Product extends PureComponent<ProductTypes, { showModal: boolean }> {
  constructor(props: ProductTypes) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  setProductId = (product: any) => {
    if (
      this.props.attributeSet &&
      this.props.attributeSet.length < (product.attributes?.length || 0)
    ) {
      this.setState(prevState => ({ showModal: !prevState.showModal }));
      return;
    }
    const newProduct: ProductCartType = {
      name: product.id,
      brand: product?.name,
      category: this.props.name,
      gallery: product?.gallery,
      id: product.id + Date.now(),
      prices: product?.prices,
      attributes: product?.attributes,
      attributeSet: this.props.attributeSet,
      count: 1,
    };
    // @ts-ignore
    this.props.addProductCart(newProduct);
  };

  render() {
    // eslint-disable-next-line no-debugger
    debugger;
    const { showModal } = this.state;
    const { product, currency, name } = this.props;
    return (
      <div className={s.item}>
        <NavLink className={s.itemLink} to={`/${name}/${product.id}`}>
          <img
            className={s.itemImage}
            src={product.gallery && product.gallery[0]}
            alt="item"
          />
          {!product.inStock && <p className={s.outStock}> OUT OF STOCK</p>}
          <p className={s.itemName}>{product.name}</p>
          <p className={s.itemPrice}>
            {product.prices.map(
              (prc: any) =>
                prc.currency.symbol === currency &&
                `${prc.currency.symbol} ${prc.amount}`,
            )}
          </p>
        </NavLink>
        {product.inStock && (
          <button
            type="button"
            onClick={() => this.setProductId(product)}
            value={product.id}
            id={product.id}
            className={s.addBtn}
          >
            <img src={cart} id={product.id} className={s.btnSvg} alt="addToCart" />
          </button>
        )}
        <Modal onClickBg={() => {}} showModal={showModal}>
          <AttributeModal product={product} />
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state: RootStateType): MapStateToProps => ({
  currency: getCurrency(state),
  attributeSet: getAttributeSet(state),
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  addProductCart: (newProduct: ProductCartType) => dispatch(setProductToCart(newProduct)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Product);
