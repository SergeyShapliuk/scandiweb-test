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

class Cart extends PureComponent<MapStateToProps> {
  render() {
    // eslint-disable-next-line no-debugger
    debugger;
    const { productCart, currency, attributes, productPage } = this.props;
    const itId = attributes.map(atr => atr.items?.map(it => it?.id).map(c => c));
    console.log('itId', itId);
    console.log('CartProductsCurrency', currency);
    console.log('CartProductsproductCart', productCart);
    console.log('CartProductsattribute', attributes);
    // @ts-ignore
    return (
      <>
        {productCart.map((item, index) => (
          <div className={s.productItem}>
            <div className={s.itemDescription}>
              <div className={s.brand}>{item.brand}</div>
              <div className={s.name}>{item.name}</div>
              <div className={s.price}>
                {productCart[index]?.prices.map(
                  v =>
                    v.currency.symbol === currency &&
                    `${v.currency.symbol} ${
                      Math.round(v.amount * item.count * 100) / 100
                    }`,
                )}
              </div>
              {/* <div className={s.attributes}> */}
              {productPage.attributes?.map(m => (
                <div key={m?.name} className={s.attributesContainer}>
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
            <div className={s.gallery}>
              <div className={s.counter}>
                <button type="button" id={item.id} className={s.button}>
                  +
                </button>
                <span className="value">{item.count}</span>
                <button type="button" className={s.button}>
                  -
                </button>
              </div>
              <div className={s.imageWrapper}>
                <div className={s.imageArrowsContainer}>
                  {productPage.gallery?.map((img: any) => (
                    <img
                      key={img[index]}
                      src={img}
                      className={s.cartImgItem}
                      alt={productPage.name}
                    />
                  ))}
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
export default connect(mapStateToProps, {})(Cart);
