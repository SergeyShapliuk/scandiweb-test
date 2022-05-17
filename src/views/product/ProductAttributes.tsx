import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import ButtonColor from '../../components/button/ButtonColor';
import ButtonText from '../../components/button/ButtonText';
import { AttributeSet, ProductType } from '../../graphql/graphql';
import { setAttributes } from '../../store/actionCreators';
import { RootStateType } from '../../store/rootStore';

import s from './ProductAttributes.module.scss';

type MapDispatchToProps = {
  addAttributes: (attribute: AttributeSet) => void;
};
type MapStateToPropsType = {
  state: RootStateType;
};
type ProductAttributesType = {
  product: ProductType;
} & MapDispatchToProps;

type PropertyType = {
  name: string;
  id: string;
};

class ProductAttributes extends PureComponent<
  ProductAttributesType,
  { buttonWithText: PropertyType[]; buttonWithColor: string[] }
> {
  constructor(props: ProductAttributesType) {
    super(props);
    this.state = {
      buttonWithText: [],
      buttonWithColor: [],
    };
  }

  componentDidUpdate(prevProps: Readonly<ProductAttributesType>) {
    if (prevProps.product.attributes !== this.props.product.attributes) {
      this.setState({ buttonWithText: [], buttonWithColor: [] });
    }
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
    // @ts-ignore
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
    // @ts-ignore
    this.props.addAttributes(result);
  };

  isButtonSelected = (name: string, id: string) => {
    const temp = this.state.buttonWithText.find(p => p.name === name);
    return temp?.id === id;
  };

  render() {
    const { product } = this.props;
    const { buttonWithColor } = this.state;
    return product.attributes?.map(typeName => (
      <div key={typeName?.id} className={s.attributesContainer}>
        <h2 className={s.title}>{typeName?.name?.toUpperCase()}:</h2>
        <div className={s.list}>
          {typeName?.items?.map(itemName =>
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
          )}
        </div>
      </div>
    ));
  }
}
const mapStateToProps = (state: RootStateType): MapStateToPropsType => ({
  state,
});
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToProps => ({
  addAttributes: (attribute: AttributeSet) => dispatch(setAttributes(attribute)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductAttributes);
