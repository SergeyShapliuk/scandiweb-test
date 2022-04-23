import React, { PureComponent } from 'react';

import { NavLink } from 'react-router-dom';

import cart from '../../assets/image/cart-white.svg';
import { Products } from '../../generated/graphql';

import s from './Product.module.css';

type ProductType = {
  data: Products;
};

class Product extends PureComponent<ProductType> {
  render() {
    const { data } = this.props;
    console.log('product', data);
    return (
      <div key={data.id} className={s.item}>
        <NavLink className={s.itemLink} to={`/products/${data.id}`}>
          <img className={s.itemImage} src={data.gallery && data.gallery[0]} alt="item" />
          {!data.inStock && <p className={s.outStock}> OUT OF STOCK</p>}
          <p className={s.itemName}>{data.name}</p>
          <p className={s.itemPrice}>
            {data.prices.map(
              (prc: any) => prc.currency.symbol && `${prc.currency.symbol} ${prc.amount}`,
            )}
          </p>
        </NavLink>
        {data.inStock && (
          <div id={data.id} className={s.addBtn}>
            <img src={cart} id={data.id} className={s.btnSvg} alt="addToCart" />
          </div>
        )}
      </div>
    );
  }
}

export default Product;
