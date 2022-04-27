import React, { PureComponent } from 'react';

import { connect } from 'react-redux';

import { AttributeSet, ProductType } from '../../generated/graphql';
import { addAttributes } from '../../store/mainReducer/mainReducer';
import { RootStateType } from '../../store/rootStore/rootReducer';

import s from './ProductAttributes.module.css';

type MapStateToProps = {
  attributes: AttributeSet[];
};
type ProductAttributesType = {
  product: ProductType;
  addAttributes: (attribute: AttributeSet[]) => void;
};
type ProductAttributesTypes = MapStateToProps & ProductAttributesType;

class ProductAttributes extends PureComponent<ProductAttributesTypes> {
  chooseAttribute = (ID: string, id: string) => {
    const attr = this.props.product.attributes?.find(item => item?.id === ID);
    const res = { ...attr, items: attr?.items?.filter(v => v?.id === id) };
    console.log('res', res);
    this.props.addAttributes(res);
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
const mapStateToProps = (state: RootStateType): MapStateToProps => ({
  attributes: state.main.attributes,
});
export default connect(mapStateToProps, { addAttributes })(ProductAttributes);
