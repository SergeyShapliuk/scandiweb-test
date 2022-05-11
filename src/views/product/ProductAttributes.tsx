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
  productId: string;
  addAttributes: (attribute?: AttributeSet[], productId?: string) => void;
  // clearAttributes: () => void;
};
type ProductAttributesTypes = { showModal: boolean } & MapStateToProps &
  ProductAttributesType;

class ProductAttributes extends PureComponent<ProductAttributesTypes> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedAttr: [],
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

  chooseAttribute = (nameId: string, itemId: string) => {
    // const { name, value } = e.currentTarget;
    console.log('id', nameId);
    console.log('ID', itemId);
    // console.log('prod', productId);
    // console.log('e.currentTarget', e.currentTarget);

    const attr = this.props.product.attributes?.find(f => f?.id === nameId);
    const result = { ...attr, items: attr?.items?.filter(f => f?.id === itemId) };
    console.log('res', result);
    console.log('attr', attr);
    //   // console.log('res', res);
    this.setState({ selectedAttr: result });
    // const res = { productId, result };
    // console.log('resssss', res);
    // @ts-ignore
    this.props.addAttributes(result);
    // }
    // const res = { ...attr, items: attr?.items?.filter(v => v?.id === itemId) };
    // @ts-ignore
    // this.setState({ itemId });
    // this.setState({ nameId });
  };

  render() {
    // eslint-disable-next-line no-debugger
    debugger;
    const { product, productId, attributes, showModal } = this.props;
    const { selectedAttr }: any = this.state;

    console.log('selectedAttr', selectedAttr);
    console.log('CartproductAttributeComp', product);
    console.log('CartProducytAttributeComp', attributes);
    console.log('CartProducytAttributeComp', showModal);
    console.log('productId', productId);
    return product.attributes?.map(m => (
      <div key={m?.name} className={s.attributesContainer}>
        <h2 className={s.title}>{m?.name?.toUpperCase()}:</h2>
        <div className={s.list}>
          {m?.items?.map((a: any) => (
            <button
              type="button"
              // aria-hidden
              key={a.id}
              // name={m.id}
              // value={a?.id}
              onClick={() => this.chooseAttribute(m.id, a.id)}
              className={`${
                m.type !== 'swatch' ? s.attributeItem : s.attributeItemSwatch
              } ${
                // eslint-disable-next-line no-nested-ternary
                selectedAttr === attributes.find(f => f.id)?.items?.find(fi => fi?.id)
                  ? m.type !== 'swatch'
                    ? s.active
                    : s.activeSwatch
                  : ''
              }`}
              style={{
                backgroundColor: a.value,
              }}
            >
              {`${m.type !== 'swatch' ? a.value : ''}`}
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
