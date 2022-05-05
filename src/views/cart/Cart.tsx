import React, { PureComponent } from 'react';

import { connect } from 'react-redux';

import Carousel from '../../components/carousel/Carousel';
import { AttributeSet, ProductCartType, ProductType } from '../../generated/graphql';
import {
  addAttributes,
  decProduct,
  getTotalSum,
  incProduct,
} from '../../store/mainReducer/mainReducer';
import { RootStateType } from '../../store/rootStore/rootReducer';
// import ProductAttributes from '../product/ProductAttributes';

import s from './Cart.module.css';

type MapStateToProps = {
  productCart: ProductCartType[];
  currency: string;
  attributes: AttributeSet[];
  productPage: ProductType;
  productsCount: number;
  totalSum: number;
};
type MapStateToDispatch = {
  incProduct: (index: number) => void;
  decProduct: (index: number) => void;
  getTotalSum: () => void;
  // addAttributes:(attribute: AttributeSet)
};
type CartType = {
  showModal?: boolean;
};
class Cart extends PureComponent<MapStateToProps & MapStateToDispatch & CartType> {
  componentDidMount() {
    this.props.getTotalSum();
  }

  componentDidUpdate(
    prevProps: Readonly<MapStateToProps & MapStateToDispatch & CartType>,
  ) {
    if (
      prevProps.productCart !== this.props.productCart ||
      prevProps.currency !== this.props.currency
    ) {
      this.props.getTotalSum();
    }
  }

  increment = (index: number) => {
    this.props.incProduct(index);
  };

  decrement = (index: number, count: number) => {
    if (count >= 0) this.props.decProduct(index);
  };

  chooseAttributes = (nameId: any, itemId: any) => {
    console.log('id', itemId);
    console.log('ID', nameId);
    const attr = this.props.productCart.map(m =>
      m.attributes?.map(f =>
        f?.name === nameId
          ? { ...f, items: f?.items?.filter(fi => fi?.id === itemId) }
          : f,
      ),
    );

    const attttr = this.props.attributes;

    console.log('attr', attr);
    console.log('attrtttt', attttr);

    // @ts-ignore
    this.props.addAttributes(attr.flat());
  };

  render() {
    // eslint-disable-next-line no-debugger
    debugger;
    const {
      productCart,
      currency,
      attributes,
      productPage,
      showModal,
      productsCount,
      totalSum,
    } = this.props;

    // const itId = attributes.map(atr => atr.items?.map(it => it?.id).map(c => c));
    // const itName = attributes.map(atr => atr.name);

    // console.log('itId', itId);
    // console.log('itName', itName);
    console.log('CartProductsCurrency', currency);
    console.log('CartProductsproductCart', productCart);
    console.log('CartProductsattribute', attributes);

    // @ts-ignore
    return (
      <div className={s.cartBlock}>
        {!showModal && <div>Cart</div>}
        {productCart.map((item, index) => (
          <div className={s.cartContainer}>
            <div className={s.attributeContainer}>
              <div className={s.brand}>{item.brand}</div>
              <div className={s.name}>{item.name}</div>
              <div className={s.price}>
                {productCart[index].prices.map(
                  price =>
                    price.currency.symbol === currency &&
                    `${price.currency.symbol} ${
                      Math.round(price.amount * item.count * 100) / 100
                    }`,
                )}
              </div>
              {productCart[index].attributes?.map(m => (
                <div key={m?.name} className={s.attributesContainer}>
                  <h2 className={s.title}>
                    {m?.name?.toUpperCase()}:::{m?.name}:
                  </h2>
                  <div className={s.list}>
                    {m?.items?.map((a: any) => (
                      <button
                        onClick={() => this.chooseAttributes(m.name, a.id)}
                        type="button"
                        key={a.id}
                        value={a.id}
                        className={`${s.attributeItem} ${
                          attributes
                            .find(it => it.name === m.name)
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
              ))}
              {/* <ProductAttributes product={productCart} showModal={showModal} /> */}
            </div>
            <div className={s.galleryBlock}>
              <div className={s.galleryContainer}>
                <div className={s.counter}>
                  <button
                    type="button"
                    onClick={() => this.increment(index)}
                    className={s.button}
                  >
                    +
                  </button>
                  <span className={s.value}>{item.count}</span>
                  <button
                    type="button"
                    onClick={() => this.decrement(index, item.count)}
                    className={s.button}
                  >
                    -
                  </button>
                </div>
                {!showModal ? (
                  <Carousel>
                    {item.gallery?.map((image: any) => (
                      <img src={image} alt={productPage.name} />
                    ))}
                  </Carousel>
                ) : (
                  <img
                    src={item.gallery && item.gallery[0]}
                    className={s.image}
                    alt={productPage.name}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
        <div className={s.total}>
          {!showModal && <div>Quantity: {productsCount}</div>}
          <div className={s.totalTitle}>Total: </div>
          <span className={s.totalPrice}>{`${currency}${
            Math.round(totalSum * 100) / 100
          }`}</span>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state: RootStateType): MapStateToProps => ({
  productCart: state.main.productCart,
  currency: state.main.currency,
  attributes: state.main.attributes,
  productPage: state.main.productPage,
  productsCount: state.main.productsCount,
  totalSum: state.main.totalSum,
});
export default connect(mapStateToProps, {
  incProduct,
  decProduct,
  getTotalSum,
  addAttributes,
})(Cart);
