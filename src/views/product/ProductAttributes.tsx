import React, { PureComponent } from 'react';

import { connect } from 'react-redux';

import { ProductType } from '../../generated/graphql';
import { setAttribute } from '../../store/mainReducer/mainReducer';

import s from './ProductAttributes.module.css';

type ProductAttributesType = {
  product: ProductType;
};
class ProductAttributes extends PureComponent<ProductAttributesType> {
  chooseAttribute = (ID: string, id: string) => {
    const attr = this.props.product.attributes?.find(item => item?.id === ID);
    const res = { ...attr, items: attr?.items?.filter(v => v?.id === id) };
    // @ts-ignore
    this.props.setAttribute(res);
  };

  render() {
    const { product } = this.props;
    console.log('attribute.name', product);
    return product.attributes?.map(m => (
      <div key={m?.id} className={s.attributesContainer}>
        <h2 className={s.title}>{m?.name?.toUpperCase()}:</h2>
        <div className={s.list}>
          {m?.items?.map((a: any) =>
            m.type === 'swatch' ? (
              <span
                aria-hidden
                onClick={() => {
                  this.chooseAttribute(m?.id, a.id);
                }}
                className={`${s.attributeItem} ${
                  product.attributes
                    ?.find(it => it?.id === m?.id)
                    ?.items?.find(itm => itm?.id === a.id)
                    ? s.activeSwatch
                    : null
                }`}
                style={{ backgroundColor: `${a.value}` }}
              />
            ) : (
              <span
                aria-hidden
                className={`${s.attributeItem} ${
                  product.attributes
                    ?.find(it => it?.id === m?.id)
                    ?.items?.find(itm => itm?.id === a.id)
                    ? s.active
                    : null
                }`}
                onClick={() => {
                  this.chooseAttribute(m?.id, a.id);
                }}
              >
                {a.value}
              </span>
            ),
          )}
        </div>
      </div>
    ));
  }
}
export default connect(setAttribute)(ProductAttributes);
