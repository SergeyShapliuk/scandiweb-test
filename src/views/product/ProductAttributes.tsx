import React, { PureComponent } from 'react';

import { connect } from 'react-redux';

import { AttributeSet, ProductType } from '../../generated/graphql';
import { addAttributes, clearAttributes } from '../../store/mainReducer/mainReducer';
import { RootStateType } from '../../store/rootStore/rootReducer';

import s from './ProductAttributes.module.css';

type MapStateToProps = {
  attributes: AttributeSet[];
};
type ProductAttributesType = {
  product: ProductType;
  // addAttributes: (attribute?: AttributeSet[], productId?: string) => void;
  // clearAttributes: () => void;
};
type ProductAttributesTypes = MapStateToProps & ProductAttributesType;

class ProductAttributes extends PureComponent<
  ProductAttributesTypes,
  { selectedAttr: AttributeSet }
> {
  constructor(props: ProductAttributesTypes) {
    super(props);
    this.state = {
      selectedAttr: {} as AttributeSet,
    };
  }
  //
  // componentDidUpdate(prevProps: Readonly<ProductAttributesTypes>) {
  //   if (prevProps.attributes !== this.props.attributes) {
  //     console.log('hello');
  //   }
  // }

  // componentWillUnmount() {
  //   this.props.clearAttributes();
  // }
  // chooseAttribute = (nameId: string, itemId: string) => {
  //   // eslint-disable-next-line react/no-access-state-in-setstate
  //   const upAttr = this.state.selectedAttr.map((m: any) => {
  //     if (m.id === nameId) {
  //       return { ...m, items: itemId };
  //     }
  //     return m;
  //   });
  //   this.setState({ selectedAttr: upAttr });
  //   this.props.addAttributes(this.state.selectedAttr);
  // };
  chooseAttribute = (e: any) => {
    // const { name, value } = e;
    // const { name, value } = e.currentTarget;
    // console.log('id', name);
    // console.log('ID', value);
    console.log('e', e.target);
    // console.log('e.currentTarget', e.currentTarget);

    const attr = this.props.product.attributes?.find(f => f?.id);
    const result = { ...attr, items: attr?.items?.filter(f => f?.id) };
    console.log('res', result);
    console.log('attr', attr);
    //   // console.log('res', res);
    // @ts-ignore
    this.setState({ selectedAttr: result });
    // const res = { productId, result };
    // console.log('resssss', res);
    // @ts-ignore
    // this.props.addAttributes(result);
    // }
    // const res = { ...attr, items: attr?.items?.filter(v => v?.id === itemId) };
    // @ts-ignore
    // this.setState({ itemId });
    // this.setState({ nameId });
  };

  render() {
    const { product, attributes } = this.props;
    const { selectedAttr } = this.state;

    console.log('selectedAttr', selectedAttr);
    console.log('CartproductAttributeComp', product);
    console.log('CartProducytAttributeComp', attributes);

    return product.attributes?.map(m => (
      <div key={m?.name} className={s.attributesContainer}>
        <h2 className={s.title}>{m?.name?.toUpperCase()}:</h2>
        <div className={s.list}>
          {m?.items?.map(a => (
            <button
              type="button"
              // aria-hidden
              key={a?.id}
              name={m.id}
              value={a?.id}
              onClick={this.chooseAttribute}
              className={`${
                m.type !== 'swatch' ? s.attributeItem : s.attributeItemSwatch
              } ${
                // eslint-disable-next-line no-nested-ternary
                selectedAttr.id === m.id && selectedAttr.items?.find(f => f?.id === a?.id)
                  ? m.type !== 'swatch'
                    ? s.active
                    : s.activeSwatch
                  : ''
              }`}
              style={{
                backgroundColor: a?.value,
              }}
            >
              {m.type !== 'swatch' ? a?.value : ''}
            </button>
          ))}
        </div>
      </div>
    ));
  }
}
const mapStateToProps = (state: RootStateType): MapStateToProps => ({
  attributes: state.main.attributes,
});
export default connect(mapStateToProps, { addAttributes, clearAttributes })(
  ProductAttributes,
);
