import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import cart from '../../assets/image/cart-white.svg';
import Modal from '../../components/modal/Modal';
import { AttributeSet, ProductCartType, ProductType } from '../../graphql/graphql';
import {
  clearAttributes,
  setIncProductCount,
  setProductToCart,
} from '../../store/actionCreators';
import { RootStateType } from '../../store/rootStore';
import {
  getAttributeSet,
  getCurrency,
  getProduct,
  getProductCart,
} from '../../utils/selectors';
import AttributeModal from '../modalAttributes/AttributeModal';

import s from './Product.module.scss';

import { getProductPage } from 'store/mainReducer';

type MapStateToProps = {
  currency: string;
  attributeSet: AttributeSet[];
  productPage: ProductType;
  productCart: ProductCartType[];
};
type MapDispatchToProps = {
  setProductToCart: (product: ProductCartType) => void;
  getProductPage: (productsId: string) => void;
  setIncProductCount: (id: string) => void;
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
    if (product.attributes.length) {
      this.props.getProductPage(product.id);
      this.setState({ showModal: true });
    } else {
      this.addProduct(product);
    }
  };

  addProduct = (product: any) => {
    const { attributeSet } = this.props;
    if (attributeSet.length < (product.attributes?.length || 0)) {
      // eslint-disable-next-line no-alert
      alert('Please select attribute!');
      return;
    }
    const uuid = attributeSet.map(m => m.items?.map(me => me?.id));
    const newProduct: ProductCartType = {
      name: product?.name,
      brand: product?.brand,
      category: this.props.name,
      gallery: product?.gallery,
      id: product.id + uuid,
      prices: product?.prices,
      attributes: product?.attributes,
      attributeSet,
      count: 1,
    };
    const result = this.props.productCart
      .filter(prod => prod.id === newProduct.id)
      .find(f =>
        f.attributeSet?.every((atr, atrIndex) =>
          atr?.items?.every(
            (item, itemIndex) =>
              // @ts-ignore
              item?.id === newProduct?.attributeSet[atrIndex].items[itemIndex].id,
          ),
        ),
      );
    if (!result) {
      this.props.setProductToCart(newProduct);
      this.props.clearAttributes();
      this.setState({ showModal: false });
    } else {
      this.props.setIncProductCount(newProduct.id);
      this.props.clearAttributes();
      this.setState({ showModal: false });
    }
  };

  cartModalHandler = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  render() {
    const { showModal } = this.state;
    const { product, currency, name, productPage, productCart } = this.props;
    return (
      <div className={s.itemContainer}>
        <NavLink className={s.itemLink} to={`/${name}/${product.id}`}>
          <img
            className={s.itemImage}
            src={product.gallery && product.gallery[0]}
            alt="item"
          />
          {!product.inStock && <p className={s.outStock}> OUT OF STOCK</p>}
          <span className={s.itemName}>{`${product.brand} ${product.name}`}</span>
          <p className={s.itemPrice}>
            {product.prices.map(
              (prc: any) =>
                prc.currency.symbol === currency &&
                `${prc.currency.symbol} ${prc.amount}`,
            )}
          </p>
        </NavLink>
        {product.inStock && (
          <div
            aria-hidden
            onClick={() => this.addAttribute(product)}
            id={product.id}
            className={s.addBtn}
          >
            <img src={cart} id={product.id} className={s.btnSvg} alt="addToCart" />
          </div>
        )}
        <Modal onClickBg={this.cartModalHandler} showModal={showModal}>
          <AttributeModal
            product={productPage}
            productCart={productCart}
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
  productCart: getProductCart(state),
});

export default connect(mapStateToProps, {
  setProductToCart,
  getProductPage,
  setIncProductCount,
  clearAttributes,
})(Product);
