import React, { PureComponent } from 'react';

import { connect } from 'react-redux';

import Carousel from '../../components/carousel/Carousel';
import { AttributeSet, ProductCartType, ProductType } from '../../generated/graphql';
import { decProduct, incProduct } from '../../store/mainReducer/mainReducer';
import { RootStateType } from '../../store/rootStore/rootReducer';
// import ProductAttributes from '../product/ProductAttributes';

import s from './Cart.module.css';

type MapStateToProps = {
  productCart: ProductCartType[];
  currency: string;
  attributes: AttributeSet[];
  productPage: ProductType;
  productsCount: number;
};
type MapStateToDispatch = {
  incProduct: (index: number) => void;
  decProduct: (index: number) => void;
};

class Cart extends PureComponent<
  MapStateToProps & MapStateToDispatch & { showModal: boolean }
> {
  increment = (index: number) => {
    this.props.incProduct(index);
  };

  decrement = (index: number, count: number) => {
    if (count >= 0) this.props.decProduct(index);
  };

  render() {
    const { productCart, currency, attributes, productPage, showModal, productsCount } =
      this.props;
    const itId = attributes.map(atr => atr.items?.map(it => it?.id).map(c => c));
    const itName = attributes.map(atr => atr.name);
    console.log('itId', itId);
    console.log('itName', itName);
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
                {productCart[index].prices?.map(
                  v =>
                    v.currency.symbol === currency &&
                    `${v.currency.symbol} ${
                      Math.round(v.amount * item.count * 100) / 100
                    }`,
                )}
              </div>
              {productCart[index].attributes?.map(m => (
                <div key={m?.name} className={s.attributesContainer}>
                  <h2 className={s.title}>{m?.name?.toUpperCase()}:</h2>
                  <div className={s.list}>
                    {m?.items?.map((a: any) => (
                      <button
                        type="button"
                        key={a.id}
                        disabled={showModal}
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
                    {item.gallery?.map(image => (
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
          <div>Quantity: {productsCount}</div>
          <div className={s.totalTitle}>Total: {}</div>
          <span className={s.totalPrice}>
            {/* {`${currencyConverter(price)}${this.props.totalSum.toFixed(2)}`} */}
          </span>
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
});
export default connect(mapStateToProps, {
  incProduct,
  decProduct,
})(Cart);
