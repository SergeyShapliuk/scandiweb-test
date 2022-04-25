import React, { PureComponent } from 'react';

import { CategoryProductType } from '../generated/graphql';

import Product from './product/Product';
import s from './ProductList.module.css';

export type ProductsListType = {
  data: CategoryProductType;
};

class ProductsList extends PureComponent<ProductsListType> {
  render() {
    const { data } = this.props;
    console.log('productList', data);
    return (
      <div className={s.productList}>
        <div>{data.name}</div>
        <div className={s.list}>
          {data.products.map(m => (
            <Product product={m} key={m?.name} />
          ))}
        </div>
      </div>
    );
  }
}

export default ProductsList;
