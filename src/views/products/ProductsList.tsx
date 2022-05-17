import React, { PureComponent } from 'react';

import { CategoryProductType } from '../../graphql/graphql';
import Product from '../product/Product';

import s from './ProductList.module.scss';

export type ProductsListType = {
  data: CategoryProductType;
  name: string;
};

class ProductsList extends PureComponent<ProductsListType> {
  render() {
    const { data, name } = this.props;
    return (
      <div className={s.productList}>
        <div className={s.name}>{data.name}</div>
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
