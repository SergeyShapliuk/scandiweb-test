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
  productId: string;
  // addAttributes: (attribute: AttributeSet[]) => void;
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

  chooseAttribute = (e: any) => {
    // console.log('id', itemId);
    // console.log('ID', nameId);
    console.log('e', e.target);
    // if (this.props.product.id === nameId) {
    //   const result = this.props.product.attributes?.find(m =>
    //     m?.items?.filter(f => f?.id === itemId),
    //   );
    //   console.log('res', { ...result });
    //   // console.log('attr', attr);
    //   // console.log('res', res);
    //   // @ts-ignore
    //   this.props.addAttributes(...result);
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

    const { itemId, nameId }: any = this.state;

    console.log(' itemId, nameId', itemId, nameId);
    console.log('CartproductAttributeComp', product);
    console.log('CartProducytAttributeComp', attributes);
    console.log('CartProducytAttributeComp', showModal);
    console.log('productId', productId);
    return (
      product.attributes?.length &&
      product.attributes.map(m => (
        <div key={m?.name} className={s.attributesContainer}>
          <h2 className={s.title}>{m?.name?.toUpperCase()}:</h2>
          <div className={s.list}>
            {m?.items?.map((a: any) => (
              <button
                type="button"
                key={a?.id}
                name={m.id}
                value={a?.value}
                onClick={this.chooseAttribute}
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
