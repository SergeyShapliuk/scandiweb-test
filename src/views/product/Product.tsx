import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import cart from '../../assets/image/cart-white.svg';
import Modal from '../../components/modal/Modal';
import { AttributeSet, ProductCartType, ProductType } from '../../graphql/graphql';
import { clearAttributes, setProductToCart } from '../../store/actionCreators';
import { RootStateType } from '../../store/rootStore';
import { getAttributeSet, getCurrency, getProduct } from '../../utils/selectors';
import AttributeModal from '../modalAttributes/AttributeModal';

import s from './Product.module.scss';

import { getProductPage } from 'store/mainReducer';

type MapStateToProps = {
  currency: string;
  attributeSet: AttributeSet[];
  productPage: ProductType;
};
type MapDispatchToProps = {
  setProductToCart: (product: ProductCartType) => void;
  getProductPage: (productsId: string) => void;
  clearAttributes: () => void;
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

  addAttribute = (product: any) => {
    this.props.getProductPage(product.id);
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  addProduct = (product: any) => {
    const { attributeSet } = this.props;
    if (
      this.props.attributeSet &&
      this.props.attributeSet.length < (product.attributes?.length || 0)
    ) {
      // eslint-disable-next-line no-alert
      alert('Please choose all or other attributes!');
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
      attributeSet,
      count: 1,
    };
    this.props.setProductToCart(newProduct);
    this.props.clearAttributes();
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  cartModalHandler = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  render() {
    const { showModal } = this.state;
    const { product, currency, name, productPage } = this.props;
    return (
      <div className={s.itemContainer}>
        <NavLink className={s.itemLink} to={`/${name}/${product.id}`}>
          <img
            className={s.itemImage}
            src={product.gallery && product.gallery[0]}
            alt="item"
          />
          {!product.inStock && <p className={s.outStock}> OUT OF STOCK</p>}
          <span className={s.itemName}>
            {product.name} {product.id}
          </span>
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
            onClick={() => this.addAttribute(product)}
            value={product.id}
            id={product.id}
            className={s.addBtn}
          >
            <img src={cart} id={product.id} className={s.btnSvg} alt="addToCart" />
          </button>
        )}
        <Modal onClickBg={this.cartModalHandler} showModal={showModal}>
          <AttributeModal
            product={productPage}
            addProduct={this.addProduct}
            onClickBg={this.cartModalHandler}
          />
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state: RootStateType): MapStateToProps => ({
  currency: getCurrency(state),
  attributeSet: getAttributeSet(state),
  productPage: getProduct(state),
});

export default connect(mapStateToProps, {
  setProductToCart,
  getProductPage,
  clearAttributes,
})(Product);
