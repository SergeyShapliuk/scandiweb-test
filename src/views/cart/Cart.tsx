import React, { PureComponent } from 'react';

import { connect } from 'react-redux';

import { AttributeSet, ProductCartType } from '../../generated/graphql';
import { RootStateType } from '../../store/rootStore/rootReducer';

import s from './Cart.module.css';

type MapStateToProps = {
  productCart: ProductCartType[];
  currency: string;
  attributes: AttributeSet[];
};

class Cart extends PureComponent<MapStateToProps> {
  render() {
    const { productCart, currency, attributes } = this.props;
    console.log('CartProductsCurrency', currency);
    return (
      <>
        {productCart.map((item, index) => (
          <div className={s.productItem}>
            <div className={s.itemDescription}>
              <div className={s.brand}>{item.brand}</div>
              <div className={s.name}>{item.name}</div>
              <div className={s.price}>
                {
                  productCart[index]?.prices.find(v => v.currency.symbol === currency)
                    ?.amount
                }
              </div>
              <div className={s.attributes}>
                {attributes.map(v => (
                  <div className={s.attribute}>
                    <div className={s.attributeTitle}>
                      {
                        productCart
                          .find(tm => tm.category === item.category)
                          ?.attributes?.find(p => p?.name === v.name)?.name
                      }
                      :
                    </div>
                    {v.type === 'swatch'
                      ? v.items?.map(it => (
                          <div
                            className={`${s.attributeItem} ${
                              productCart[index]?.attributes
                                ?.find(p => p?.name === v.name)
                                ?.items?.find(iz => iz?.value === it?.value)
                                ? s.active
                                : null
                            }`}
                            style={{ backgroundColor: `${it?.value}` }}
                          />
                        ))
                      : v.items?.map(it => (
                          <div
                            className={`${s.attributeItem} ${
                              productCart[index]?.attributes
                                ?.find(p => p?.name === v.name)
                                ?.items?.find(iz => iz?.value === it?.value)
                                ? s.active
                                : null
                            }`}
                          >
                            {it?.value}
                          </div>
                        ))}
                  </div>
                ))}
              </div>
            </div>
            <div className={s.gallery}>
              <div className={s.countButtons}>
                <span className={s.countBtn} aria-hidden>
                  <span className={s.plus} />
                </span>
                <div className={s.count}>{item.count}</div>
                <span className={s.countBtn} aria-hidden>
                  <span className={s.minus} />
                </span>
              </div>
              <div className={s.imageWrapper}>
                <div className={s.imageArrowsContainer}>
                  <img
                    className={s.image}
                    // src={item.gallery && item.gallery[this.state.currentImages[index]]}
                    alt=""
                  />
                  <span className={s.leftArrow} aria-hidden />
                  <span className={s.rightArrow} aria-hidden />
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
});
export default connect(mapStateToProps, {})(Cart);
