import React, { PureComponent } from 'react';

import { connect } from 'react-redux';

import ButtonColor from '../../components/button/ButtonColor';
import ButtonText from '../../components/button/ButtonText';
import { AttributeSet, ProductType } from '../../generated/graphql';
import { addAttributes, clearAttributes } from '../../store/mainReducer/mainReducer';
import { RootStateType } from '../../store/rootStore/rootReducer';

import s from './ProductAttributes.module.css';

type MapStateToProps = {
  attributeSet: AttributeSet[];
};
type ProductAttributesType = {
  product: ProductType;
  addAttributes: (attribute: any) => void;
  // clearAttributes: () => void;
};
type ProductAttributesTypes = MapStateToProps & ProductAttributesType;

type PropertyType = {
  name: string;
  id: string;
};

class ProductAttributes extends PureComponent<
  ProductAttributesTypes,
  { buttonWithText: PropertyType[]; buttonWithColor: string[] }
> {
  constructor(props: ProductAttributesTypes) {
    super(props);
    this.state = {
      buttonWithText: [],
      buttonWithColor: [],
    };
  }

  onTextButtonClick = (name: string, id: string) => {
    this.setState(prevState => {
      const temp = prevState.buttonWithText.find(p => p.name === name);
      if (temp) {
        if (temp.id === id) {
          return prevState;
        }
        const newButtons = prevState.buttonWithText.map(p =>
          p.name === name ? { ...p, id } : p,
        );
        return { ...prevState, buttonWithText: newButtons };
      }
      return {
        ...prevState,
        buttonWithText: [...prevState.buttonWithText, { name, id }],
      };
    });
    const attr = this.props.product.attributes?.find(f => f?.id === name);
    const result = {
      ...attr,
      items: attr?.items?.filter(f => f?.id === id),
    };
    console.log('res', result);
    this.props.addAttributes(result);
  };

  onColorClick = (name: string, id: string) => {
    this.setState({
      buttonWithColor: [name, id],
    });
    const attr = this.props.product.attributes?.find(f => f?.id === name);
    const result = {
      ...attr,
      items: attr?.items?.filter(f => f?.id === id),
    };
    console.log('res', result);
    this.props.addAttributes(result);
  };

  // chooseAttribute = (name: string, id: string) => {
  //   // console.log('name', name);
  //   // console.log('ID', id);
  //
  //   const attr = this.props.product.attributes?.find(f => f?.id===name);
  //   const result = { ...attr, items: attr?.items?.filter(f => f?.id===id) };
  //   console.log('res', result);
  //   console.log('attr', attr);
  //   // @ts-ignore
  //   this.props.addAttributes(result);
  // };

  isButtonSelected = (name: string, id: string) => {
    const temp = this.state.buttonWithText.find(p => p.name === name);
    return temp?.id === id;
  };

  render() {
    const { product, attributeSet } = this.props;
    const { buttonWithText, buttonWithColor } = this.state;

    console.log('selectedAttr', buttonWithText, buttonWithColor);
    console.log('CartproductAttributeComp', product);
    console.log('CartProducytAttributeComp', attributeSet);

    return product.attributes?.map(typeName => (
      <div key={typeName?.id} className={s.attributesContainer}>
        <h2 className={s.title}>{typeName?.name?.toUpperCase()}:</h2>
        <div className={s.list}>
          {typeName?.items?.map(
            itemName =>
              typeName.type !== 'swatch' ? (
                <ButtonText
                  id={itemName?.id}
                  name={typeName.id}
                  value={itemName?.value}
                  onClick={this.onTextButtonClick}
                  selected={this.isButtonSelected(typeName.id, itemName!.id)}
                  key={itemName?.id}
                />
              ) : (
                <ButtonColor
                  id={itemName?.id}
                  name={typeName.id}
                  value={itemName?.value}
                  onClick={this.onColorClick}
                  selected={
                    buttonWithColor.find(button => button === typeName.id) &&
                    buttonWithColor.find(button => button === itemName?.id)
                  }
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
  attributeSet: state.main.attributeSet,
});
export default connect(mapStateToProps, { addAttributes, clearAttributes })(
  ProductAttributes,
);
