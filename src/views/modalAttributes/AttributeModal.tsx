import React, { PureComponent } from 'react';

import { Products } from '../../generated/graphql';

import s from './AttributeModal.module.scss';

type AttributeModalType = {
  product: Products;
};
class AttributeModal extends PureComponent<AttributeModalType> {
  render() {
    // eslint-disable-next-line no-debugger
    debugger;
    const { product } = this.props;
    console.log(product.attributes?.map(m => m?.name));

    return (
      product.attributes &&
      product.attributes?.map(typeName => (
        <div key={typeName?.name} className={s.attributesContainer}>
          <h2 className={s.title}>{typeName?.name?.toUpperCase()}:</h2>
          <div className={s.list}>
            {typeName?.items?.map(itemName =>
              typeName.name === 'Capacity' ? (
                <button
                  aria-hidden
                  type="button"
                  id={itemName?.id}
                  name={typeName.id}
                  value={itemName?.value}
                >
                  {itemName?.value}
                </button>
              ) : (
                <button
                  aria-hidden
                  type="button"
                  id={itemName?.id}
                  name={typeName.id}
                  value={itemName?.value}
                  key={itemName?.id}
                  style={{ backgroundColor: itemName?.value }}
                />
              ),
            )}
          </div>
        </div>
      ))
    );
  }
}

export default AttributeModal;
