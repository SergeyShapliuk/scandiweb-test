import React, { PureComponent } from 'react';

import { connect } from 'react-redux';

import ButtonSwatch from '../../components/button/ButtonSwatch';
import ButtonText from '../../components/button/ButtonText';
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
  { buttonTypeText: string; buttonTypeSwatch: string }
> {
  constructor(props: ProductAttributesTypes) {
    super(props);
    this.state = {
      buttonTypeText: '',
      buttonTypeSwatch: '',
    };
  }

  onTextButtonClick = (value: string) => {
    console.log('onTextButtonClick', value);
    this.setState({
      buttonTypeText: value,
    });
  };

  onColorClick = (value: string) => {
    console.log('buttonTypeSwatch', value);
    this.setState({
      buttonTypeSwatch: value,
    });
  };

  // chooseAttribute = (e: any) => {
  //   // const { name, value } = e;
  //   // const { name, value } = e.currentTarget;
  //   // console.log('id', name);
  //   // console.log('ID', value);
  //   console.log('e', e.target);
  //   // console.log('e.currentTarget', e.currentTarget);
  //
  //   const attr = this.props.product.attributes?.find(f => f?.id);
  //   const result = { ...attr, items: attr?.items?.filter(f => f?.id) };
  //   console.log('res', result);
  //   console.log('attr', attr);
  //   //   // console.log('res', res);
  //   // @ts-ignore
  //   this.setState({ selectedAttr: result });
  //   // const res = { productId, result };
  //   // console.log('resssss', res);
  //   // @ts-ignore
  //   this.props.addAttributes(result);
  //   // }
  //   // const res = { ...attr, items: attr?.items?.filter(v => v?.id === itemId) };
  //   // @ts-ignore
  //   // this.setState({ itemId });
  //   // this.setState({ nameId });
  // };

  render() {
    const { product, attributes } = this.props;
    const { buttonTypeText, buttonTypeSwatch } = this.state;

    console.log('selectedAttr', buttonTypeText, buttonTypeSwatch);
    console.log('CartproductAttributeComp', product);
    console.log('CartProducytAttributeComp', attributes);

    return product.attributes?.map(typeName => (
      <div key={typeName?.id} className={s.attributesContainer}>
        <h2 className={s.title}>{typeName?.name?.toUpperCase()}:</h2>
        <div className={s.list}>
          {typeName?.items?.map(
            itemName =>
              typeName.type !== 'swatch' ? (
                <ButtonText
                  id={itemName?.id}
                  value={itemName?.value}
                  onClick={this.onTextButtonClick}
                  selected={buttonTypeText === itemName?.id}
                  key={itemName?.id}
                />
              ) : (
                <ButtonSwatch
                  id={itemName?.id}
                  value={itemName?.value}
                  onClick={this.onColorClick}
                  selected={buttonTypeSwatch === itemName?.id}
                  key={itemName?.id}
                />
              ),
            // <button
            //   type="button"
            //   // aria-hidden
            //   key={a?.id}
            //   name={m.id}
            //   value={a?.id}
            //   onClick={this.chooseAttribute}
            //   className={`${
            //     m.type !== 'swatch' ? s.attributeItem : s.attributeItemSwatch
            //   } ${
            //     // eslint-disable-next-line no-nested-ternary
            //     selectedAttr.id === m.id && selectedAttr.items?.find(f => f?.id === a?.id)
            //       ? m.type !== 'swatch'
            //         ? s.active
            //         : s.activeSwatch
            //       : ''
            //   }`}
            //   style={{
            //     backgroundColor: a?.value,
            //   }}
            // >
            //   {m.type !== 'swatch' ? a?.value : ''}
            // </button>
          )}
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
