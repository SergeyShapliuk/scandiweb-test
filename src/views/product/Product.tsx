import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import cart from '../../assets/image/cart-white.svg';
import { RootStateType } from '../../store/rootStore/rootReducer';

import s from './Product.module.css';

type MapStateToProps = {
  currency: string;
};
type ProductTypes = {
  product: any;
} & MapStateToProps;

class Product extends PureComponent<ProductTypes> {
  render() {
    const { product } = this.props;
    const { currency } = this.props;
    console.log(product.name);
    return (
      <div className={s.item}>
        <NavLink className={s.itemLink} to={`/products/${product.id}`}>
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
          <div id={product.id} className={s.addBtn}>
            <img src={cart} id={product.id} className={s.btnSvg} alt="addToCart" />
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state: RootStateType): MapStateToProps => ({
  currency: state.main.currency,
});
export default connect(mapStateToProps, {})(Product);
