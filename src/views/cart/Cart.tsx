import React, { PureComponent } from 'react';

import { connect } from 'react-redux';

import Carousel from '../../components/carousel/Carousel';
import { AttributeSet, ProductCartType } from '../../generated/graphql';
import {
  addAttributes,
  decProduct,
  getTotalSum,
  incProduct,
  removeProductFromCart,
} from '../../store/mainReducer/mainReducer';
import { RootStateType } from '../../store/rootStore/rootReducer';
// import ProductAttributes from '../product/ProductAttributes';

import s from './Cart.module.scss';

type MapStateToProps = {
  productCart: ProductCartType[];
  currency: string;
  attributeSet: AttributeSet[];
  productsCount: number;
  totalSum: number;
};
type MapStateToDispatch = {
  incProduct: (index: string) => void;
  decProduct: (index: string) => void;
  getTotalSum: () => void;
  removeProductFromCart: (productId: string) => void;
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

  increment = (id: string) => {
    this.props.incProduct(id);
  };

  decrement = (id: string, count: number) => {
    if (count > 1) {
      this.props.decProduct(id);
    } else {
      this.props.removeProductFromCart(id);
    }
  };

  // chooseAttributes = (nameId: any, itemId: any) => {
  //   console.log('id', itemId);
  //   console.log('ID', nameId);
  //   const attr = this.props.productCart.map(m =>
  //     m.attributes?.map(f =>
  //       f?.name === nameId
  //         ? { ...f, items: f?.items?.filter(fi => fi?.id === itemId) }
  //         : f,
  //     ),
  //   );
  //
  //   const attttr = this.props.attributes;
  //
  //   console.log('attr', attr);
  //   console.log('attrtttt', attttr);
  //
  //   // @ts-ignore
  //   this.props.addAttributes(attr.flat());
  // };
  isButtonSelected = (name: string, id: string, item: any) => {
    const temp =
      item.filter((i: any) => i.name === name && i.items[0].id === id).length > 0;
    return temp;
  };
  // const temp = this.props.productCart
  //   .find(p => p.id === item)
  //   ?.attributeSet?.find(fe => fe?.id === name)
  //   ?.items?.find(fr => fr?.id === id);
  // // console.log(
  // //   'temp',
  // //   temp?.items?.find(f => f?.id === id),
  // // );

  render() {
    const { productCart, currency, attributeSet, showModal, productsCount, totalSum } =
      this.props;

    const itemId = attributeSet.map(atr => atr.items);
    console.log('id', itemId);
    // const itName = attributes.map(atr => atr.name);

    // console.log('itId', itId);
    // console.log('itName', itName);
    // console.log('CartProductsCurrency', currency);
    console.log('productCart', productCart);
    // console.log('CartProductsattribute', attributeSet);

    // @ts-ignore
    return (
      <div className={s.cartBlock}>
        {!showModal && <div className={s.cartTitle}>Cart</div>}
        {productCart.map(item => (
          <div key={item.id} className={!showModal ? s.cartLine : ''}>
            <div className={s.cartContainer}>
              <div className={s.attributeContainer}>
                <div className={s.brand}>{item.brand}</div>
                <div className={s.name}>{item.name}</div>
                <div className={s.price}>
                  {item.prices.map(
                    price =>
                      price.currency.symbol === currency &&
                      `${price.currency.symbol} ${
                        Math.round(price.amount * item.count * 100) / 100
                      }`,
                  )}
                </div>
                {item.attributes?.map(m => (
                  <div key={m?.id} className={s.attributesContainer}>
                    <h2 className={s.title}>{m?.name}:</h2>
                    <div className={s.list}>
                      {m?.items?.map(a =>
                        m.type !== 'swatch' ? (
                          <button
                            aria-hidden
                            type="button"
                            id={a?.id}
                            name={a!.id}
                            value={a?.value}
                            className={`${s.attributeItem} ${
                              this.isButtonSelected(m.id, a!.id, item.attributeSet)
                                ? s.active
                                : ''
                            }`}
                            key={a?.id}
                          >
                            {a?.value}
                          </button>
                        ) : (
                          <button
                            aria-hidden
                            type="button"
                            id={m?.id}
                            name={a!.id}
                            value={a?.value}
                            className={`${s.attributeItem} ${
                              this.isButtonSelected(m.id, a!.id, item.attributeSet)
                                ? s.active
                                : ''
                            }`}
                            key={a?.id}
                            style={{ backgroundColor: a?.value }}
                          />
                        ),
                      )}
                    </div>
                  </div>
                ))}
                {/* <ProductAttributes product={productCart} showModal={showModal} /> */}
              </div>
              <div className={s.galleryBlock}>
                <div className={s.galleryContainer}>
                  <div className={s.counter}>
                    <button
                      value={item.id}
                      type="button"
                      onClick={() => this.increment(item.id)}
                      className={s.button}
                    >
                      +
                    </button>
                    <span className={s.value}>{item.count}</span>
                    <button
                      value={item.id}
                      type="button"
                      onClick={() => this.decrement(item.id, item.count)}
                      className={s.button}
                    >
                      -
                    </button>
                  </div>
                  {!showModal ? (
                    <Carousel>
                      {item.gallery?.map((image: any) => (
                        <img src={image} alt="" />
                      ))}
                    </Carousel>
                  ) : (
                    <img
                      src={item.gallery && item.gallery[0]}
                      className={s.image}
                      alt=""
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className={!showModal ? s.cartLine : ''} />
        <div className={s.total}>
          {!showModal && (
            <div>
              Quantity: <span style={{ fontWeight: 'bold' }}> {productsCount}</span>
            </div>
          )}

          <div className={s.totalTitle}>
            Total:{' '}
            <span className={s.totalPrice}>{`${currency}${
              Math.round(totalSum * 100) / 100
            }`}</span>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state: RootStateType): MapStateToProps => ({
  productCart: state.main.productCart,
  currency: state.main.currency,
  attributeSet: state.main.attributeSet,
  productsCount: state.main.productsCount,
  totalSum: state.main.totalSum,
});
export default connect(mapStateToProps, {
  incProduct,
  decProduct,
  getTotalSum,
  addAttributes,
  removeProductFromCart,
})(Cart);
