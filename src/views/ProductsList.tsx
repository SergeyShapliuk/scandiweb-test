import React, { PureComponent } from 'react';

import { CategoryProductType } from '../generated/graphql';

import Product from './product/Product';
import s from './ProductList.module.css';

export type ProductsListType = {
  data: CategoryProductType;
  name: string;
};

class ProductsList extends PureComponent<ProductsListType> {
  render() {
    // eslint-disable-next-line no-debugger
    debugger;
    const { data, name } = this.props;
    console.log('productListttt', data);
    return (
      <div className={s.productList}>
        <div>{data.name}</div>
        <div className={s.list}>
          {data.products.map(m => (
            <Product product={m} name={name} key={m?.id} />
          ))}
        </div>
      </div>
    );
  }
}

export default ProductsList;
