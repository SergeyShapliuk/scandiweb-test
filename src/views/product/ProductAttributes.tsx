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
type ProductAttributesTypes = { showModal: boolean } & MapStateToProps &
  ProductAttributesType;

class ProductAttributes extends PureComponent<ProductAttributesTypes> {
  constructor(props: any) {
    super(props);
    this.state = {
      itemId: '',
      nameId: '',
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
    this.setState({ nameId });
  };

  render() {
    // eslint-disable-next-line no-debugger
    debugger;
    const { product, attributes, showModal } = this.props;

    const { itemId, nameId }: any = this.state;

    console.log(' itemId, nameId', itemId, nameId);
    console.log('CartproductAttributeComp', product);
    console.log('CartProducytAttributeComp', attributes);
    return (
      product.attributes?.length &&
      product.attributes.map(m => (
        <div key={m?.name} className={s.attributesContainer}>
          <h2 className={s.title}>{m?.name?.toUpperCase()}:</h2>
          <div className={s.list}>
            {m?.items?.map((a: any) => (
              <button
                type="button"
                key={a.id}
                disabled={showModal}
                onClick={() => {
                  this.chooseAttribute(m?.id, a.id);
                }}
                className={`${s.attributeItem} ${
                  attributes
                    .find(it => it.id === m?.id)
                    ?.items?.find(itm => itm?.id === a?.id)
                    ? s.active
                    : ''
                }`}
                style={{ backgroundColor: `${a.value}` }}
              >
                {`${m.type !== 'swatch' ? a.value : ''}`}
              </button>
            ))}
          </div>
        </div>
      ))
    );
  }
}
const mapStateToProps = (state: RootStateType): MapStateToProps => ({
  attributes: state.main.attributes,
});
export default connect(mapStateToProps, { addAttributes })(ProductAttributes);
