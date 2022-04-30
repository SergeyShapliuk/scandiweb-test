import React, { PureComponent } from 'react';

import { connect } from 'react-redux';

import { AttributeSet, ProductCartType, ProductType } from '../../generated/graphql';
import { RootStateType } from '../../store/rootStore/rootReducer';

import s from './Cart.module.css';

type MapStateToProps = {
  productCart: ProductCartType[];
  currency: string;
  attributes: AttributeSet[];
  productPage: ProductType;
};

class Cart1 extends PureComponent<MapStateToProps> {
  // increment(index: number) {
  //
  // }

  render() {
    // eslint-disable-next-line no-debugger
    debugger;
    const { productCart, currency, attributes, productPage } = this.props;
    const itId = attributes.map(atr => atr.items?.map(it => it?.id).map(c => c));
    const itName = attributes.map(atr => atr.name);
    console.log('itId', itId);
    console.log('itName', itName);
    console.log('CartProductsCurrency', currency);
    console.log('CartProductsproductCart', productCart);
    console.log('CartProductsattribute', attributes);
    console.log('CartProductsPage', productPage);
    // @ts-ignore
    return (
      <>
        {productCart.map((item, index) => (
          <div className={s.cartContainer}>
            <div className={s.itemsLeft}>
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
              <div className={s.attributesContainer}>
                {productPage.attributes?.map(m => (
                  <div key={m?.id} className={s.attributesItem}>
                    <h2 className={s.title}>{m?.name?.toUpperCase()}:</h2>
                    <div className={s.list}>
                      {m?.items?.map(a => (
                        <span
                          aria-hidden
                          key={a?.id}
                          // onClick={() => {
                          //   this.chooseAttribute(m?.id, a.id);
                          // }}
                          className={s.attributeItem}
                          // className={`${s.attributeItem} ${
                          //   product.attributes
                          //     ?.find(it => it?.id === m?.id)
                          //     ?.items?.find(itm => itm?.id === a.id)
                          //     ? s.active
                          //     : null
                          // }`}
                          style={{ backgroundColor: `${a?.value}` }}
                        >
                          {`${m.type !== 'swatch' ? a?.value : ''}`}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={s.galleryContainer}>
              <div className={s.counter}>
                <button
                  type="button"
                  id={item.id}
                  // onClick={() => this.increment(index)}
                  className={s.button}
                >
                  +
                </button>
                <span className={s.value}>{item.count}</span>
                <button type="button" className={s.button}>
                  -
                </button>
              </div>
              <div className={s.imageContainer}>
                {/* {item.gallery?.map((img: any) => ( */}
                <img
                  src={item.gallery && item.gallery[0]}
                  className={s.cartImgItem}
                  alt={productPage.name}
                />
                {/* ))} */}
                <div className={s.arrowContainer}>
                  <span className={s.leftArrow} />
                  <span className={s.rightArrow} />
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className={s.totalSum}>
          <span className={s.totalTitle}>Total</span>
          <span className={s.totalPrice}>
            {/* {`${currencyConverter(price)}${this.props.totalSum.toFixed(2)}`} */}
          </span>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state: RootStateType): MapStateToProps => ({
  productCart: state.main.productCart,
  currency: state.main.currency,
  attributes: state.main.attributes,
  productPage: state.main.productPage,
});
export default connect(mapStateToProps, {})(Cart1);
