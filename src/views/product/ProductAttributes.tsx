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
  addAttributes: (attribute: AttributeSet) => void;
};
type ProductAttributesTypes = MapStateToProps & ProductAttributesType;

class ProductAttributes extends PureComponent<ProductAttributesTypes> {
  constructor(props: any) {
    super(props);
    this.state = {
      itemId: '',
    };
  }

  chooseAttribute = (nameId: string, itemId: string) => {
    console.log('id', itemId);
    console.log('ID', nameId);
    const attr = this.props.product.attributes?.find(item => item?.id === nameId);
    const res = { ...attr, items: attr?.items?.filter(v => v?.id === itemId) };
    console.log('attr', attr);
    console.log('res', res);
    // @ts-ignore
    this.props.addAttributes(res);
    this.setState({ itemId });
  };

  render() {
    const { product } = this.props;
    const { attributes } = this.props;

    const { itemId }: any = this.state;

    console.log(' itemId, nameId', itemId);
    // console.log(isActive);
    console.log('productAttributeComp', product);
    console.log('stateProducytAttributeComp', attributes);
    return product.attributes?.map(m => (
      <div key={m?.name} className={s.attributesContainer}>
        <h2 className={s.title}>{m?.name?.toUpperCase()}:</h2>
        <div className={s.list}>
          {m?.items?.map(
            (a: any) => (
              <span
                aria-hidden
                key={a.id}
                onClick={() => {
                  this.chooseAttribute(m?.id, a.id);
                }}
                className={itemId === a.id ? s.active : s.attributeItem}
                // className={`${s.attributeItem} ${
                //   product.attributes
                //     ?.find(it => it?.id === m?.id)
                //     ?.items?.find(itm => itm?.id === a.id)
                //     ? s.active
                //     : null
                // }`}
                style={{ backgroundColor: `${a.value}` }}
              >
                {`${m.type !== 'swatch' ? a.value : ''}`} {itemId.id}
              </span>
            ),
            // ) && (
            //   <span
            //     aria-hidden
            //     key={a.id}
            //     className={itemId === a.id ? s.active : s.attributeItem}
            //     // className={`${s.attributeItem} ${
            //     //   product.attributes
            //     //     ?.find(it => it?.id === m?.id)
            //     //     ?.items?.find(itm => itm?.id === a.id)
            //     //     ? s.active
            //     //     : s.attributeItem
            //     // }`}
            //     onClick={() => {
            //       this.chooseAttribute(m?.id, a.id);
            //     }}
            //   >
            //     {a.value}
            //   </span>
            // ),
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
