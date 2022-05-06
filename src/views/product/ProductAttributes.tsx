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
  addAttributes: (attribute?: AttributeSet[]) => void;
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

  componentDidUpdate(prevProps: Readonly<ProductAttributesTypes>) {
    if (prevProps.attributes !== this.props.attributes) {
      console.log('hello');
    }
  }

  chooseAttribute = (productId: string, nameId: string, itemId: string) => {
    // const { name, value } = e.currentTarget;
    console.log('id', nameId);
    console.log('ID', itemId);
    console.log('prod', productId);
    // console.log('e.currentTarget', e.currentTarget);
    if (productId === this.props.product.id) {
      const attr = this.props.product.attributes?.find(f => f?.id === nameId);
      const result = { ...attr, items: attr?.items?.filter(f => f?.id === itemId) };
      console.log('res', result);
      console.log('attr', attr);
      //   // console.log('res', res);

      const res = { productId, result };
      console.log('resssss', res);
      // @ts-ignore
      this.props.addAttributes(result);
      // }
      // const res = { ...attr, items: attr?.items?.filter(v => v?.id === itemId) };
      // @ts-ignore
      // this.setState({ itemId });
      // this.setState({ nameId });
    }
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
                key={a.id}
                name={m.id}
                value={a?.id}
                onClick={() => this.chooseAttribute(productId, m.id, a.id)}
                className={`${s.attributeItem} ${
                  productId === product.id &&
                  attributes.find(at => at.id === m.id) &&
                  attributes.find(f => f.items?.find(fi => fi?.id === a?.id))
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
    // <div>
    //   {product?.attributes?.map((v: any) => (
    //     <div>
    //       <div className={s.attributesTitle}>{v?.name}:</div>
    //       <div className={s.attributesWrapper}>
    //         {/*= === display attribute items by type of attribute ==== */}
    //         {v.type === 'swatch'
    //           ? v.items?.map((val: any) => (
    //             <span
    //               aria-hidden
    //               onClick={() => {
    //                 this.chooseAttribute(productId, v.id, val?.id);
    //               }}
    //               className={`${s.attributeItem} ${
    //                 this.props.attributes
    //                   .find(it => it.id === v.id)
    //                   ?.items?.find(itm => itm?.id === val.id)
    //                   ? s.activeSwatch
    //                   : null
    //               }`}
    //               style={{ backgroundColor: `${val.value}` }}
    //             />
    //           ))
    //           : v.items?.map((val: any) => (
    //             <span
    //               aria-hidden
    //               className={`${s.attributeItem} ${
    //                 this.props.attributes
    //                   .find(it => it.id === v.id)
    //                   ?.items?.find(itm => itm?.id === val.id)
    //                   ? s.active
    //                   : null
    //               }`}
    //               onClick={() => {
    //                 this.chooseAttribute(productId, v.id, val.id);
    //               }}
    //             >
    //                   {val.value}
    //                 </span>
    //           ))}
    //       </div>
    //     </div>
    //   ))}
    // </div>
  }
}
const mapStateToProps = (state: RootStateType): MapStateToProps => ({
  attributes: state.main.attributes,
});
export default connect(mapStateToProps, { addAttributes })(ProductAttributes);
