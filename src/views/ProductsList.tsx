import React, { PureComponent } from 'react';

import Product from './product/Product';
import s from './ProductList.module.css';

type ProductsListType = {
  data: any;
};
class ProductsList extends PureComponent<ProductsListType> {
  render() {
    console.log('productList');
    const { data } = this.props;
    return (
      <div className={s.productList}>
        <div>{data.name}</div>
        <div className={s.list}>
          {data.products.map((m: any) => (
            <Product data={m} />
          ))}
        </div>
      </div>
    );
  }
}

export default ProductsList;
