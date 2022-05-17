import React, { PureComponent } from 'react';

import { ProductType } from '../../graphql/graphql';
import ProductAttributes from '../product/ProductAttributes';

import s from './AttributeModal.module.scss';

type AttributeModalType = {
  product: ProductType;
  addProduct: (a: any) => void;
  onClickBg: () => void;
};

class AttributeModal extends PureComponent<AttributeModalType> {
  render() {
    const { product, addProduct, onClickBg } = this.props;

    return (
      <div className={s.attributesContainer}>
        <span style={{ fontSize: '30px', borderBottom: 'green 1px solid' }}>
          Choose attribute please
        </span>
        <ProductAttributes product={product} />
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
