import React, { PureComponent } from 'react';

import { ProductCartType, ProductType } from '../../graphql/graphql';
import ProductAttributes from '../product/ProductAttributes';

import s from './AttributeModal.module.scss';

type AttributeModalType = {
  product: ProductType;
  productCart: ProductCartType[];
  addProduct: (a: any) => void;
  onClickBg: () => void;
};

class AttributeModal extends PureComponent<AttributeModalType> {
  render() {
    const { product, addProduct, onClickBg, productCart } = this.props;

    return (
      <div className={s.attributesContainer}>
        <span className={s.title}>Choose attribute please</span>
        <div className={s.attribute}>
          <ProductAttributes product={product} productToCart={productCart} />
        </div>
        <span>
          <button
            type="button"
            onClick={() => {
              addProduct(product);
            }}
            className={s.btnAdd}
          >
            add attribute
          </button>
          <button type="button" onClick={onClickBg} className={s.btnCancel}>
            cancel
          </button>
        </span>
      </div>
    );
  }
}

export default AttributeModal;
