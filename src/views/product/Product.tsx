import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { compose } from 'redux';

import cart from '../../assets/image/cart-white.svg';
import { ProductType } from '../../generated/graphql';
import { addProductCart } from '../../store/mainReducer/mainReducer';
import { RootStateType } from '../../store/rootStore/rootReducer';

import s from './Product.module.css';

type MapStateToProps = {
  currency: string;
};

type ProductTypes = {
  addProductCart: (product: ProductType) => void;
  product: ProductType;
  name: string;
};

class Product extends PureComponent<ProductTypes & MapStateToProps> {
  setProductId = (product: ProductType) => {
    console.log(product);
    this.props.addProductCart(product);
  };

  render() {
    // eslint-disable-next-line no-debugger
    debugger;
    const { product, currency, name } = this.props;
    console.log(product.name);
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
            aria-hidden
            value={product.id}
            id={product.id}
            className={s.addBtn}
          >
            <img src={cart} id={product.id} className={s.btnSvg} alt="addToCart" />
          </button>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state: RootStateType): MapStateToProps => ({
  currency: state.main.currency,
});
export default compose<any>(connect(mapStateToProps, { addProductCart }))(Product);
