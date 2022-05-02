import React, { PureComponent } from 'react';

import { connect } from 'react-redux';

import Carousel from '../../components/carousel/Carousel';
import { AttributeSet, ProductCartType, ProductType } from '../../generated/graphql';
import { decProduct, incProduct } from '../../store/mainReducer/mainReducer';
import { RootStateType } from '../../store/rootStore/rootReducer';
import ProductAttributes from '../product/ProductAttributes';

import s from './Cart.module.css';

type MapStateToProps = {
  productCart: ProductCartType[];
  currency: string;
  attributes: AttributeSet[];
  productPage: ProductType;
};
type MapStateToDispatch = {
  incProduct: (itemId: any) => void;
  decProduct: (itemId: any) => void;
};
class Cart extends PureComponent<MapStateToProps & MapStateToDispatch> {
  increment = (itemId: any) => {
    this.props.incProduct(itemId);
  };

  decrement = (itemId: any) => {
    this.props.decProduct(itemId);
  };

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
      <div className={s.cartBlock}>
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
              <ProductAttributes product={productPage} />
              {/* <div className={s.attributesContainer}> */}
              {/*  {productPage.attributes?.map(m => ( */}
              {/*    <div key={m?.id} className={s.attributesItem}> */}
              {/*      <h2 className={s.title}>{m?.name?.toUpperCase()}:</h2> */}
              {/*      <div className={s.list}> */}
              {/*        {m?.items?.map(a => ( */}
              {/*          <span */}
              {/*            aria-hidden */}
              {/*            key={a?.id} */}
              {/*            // onClick={() => { */}
              {/*            //   this.chooseAttribute(m?.id, a.id); */}
              {/*            // }} */}
              {/*            className={s.attributeItem} */}
              {/*            // className={`${s.attributeItem} ${ */}
              {/*            //   product.attributes */}
              {/*            //     ?.find(it => it?.id === m?.id) */}
              {/*            //     ?.items?.find(itm => itm?.id === a.id) */}
              {/*            //     ? s.active */}
              {/*            //     : null */}
              {/*            // }`} */}
              {/*            style={{ backgroundColor: `${a?.value}` }} */}
              {/*          > */}
              {/*            {`${m.type !== 'swatch' ? a?.value : ''}`} */}
              {/*          </span> */}
              {/*        ))} */}
              {/*      </div> */}
              {/*    </div> */}
              {/*  ))} */}
              {/* </div> */}
            </div>
            <div className={s.galleryBlock}>
              <div className={s.galleryContainer}>
                <div className={s.counter}>
                  <button
                    type="button"
                    id={item.id}
                    onClick={() => this.increment(item.id)}
                    className={s.button}
                  >
                    +
                  </button>
                  <span className={s.value}>{item.count}</span>
                  <button
                    type="button"
                    id={item.id}
                    onClick={() => this.decrement(item.id)}
                    className={s.button}
                  >
                    -
                  </button>
                </div>
                <Carousel>
                  {item.gallery?.map(image => (
                    <img src={image} alt={productPage.name} />
                  ))}
                </Carousel>
                {/* <div className={s.imageContainer}> */}
                {/*  <div className={s.arrowContainer}> */}
                {/* {item.gallery?.map((img: any) => ( */}
                {/*    <img */}
                {/*      src={item.gallery && item.gallery[0]} */}
                {/*      className={s.cartImgItem} */}
                {/*      alt={productPage.name} */}
                {/*    /> */}
                {/*    /!* ))} *!/ */}

                {/*    <span className={s.leftArrow} /> */}
                {/*    <span className={s.rightArrow} /> */}
                {/*  </div> */}
                {/* </div> */}
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
      </div>
    );
  }
}
const mapStateToProps = (state: RootStateType): MapStateToProps => ({
  productCart: state.main.productCart,
  currency: state.main.currency,
  attributes: state.main.attributes,
  productPage: state.main.productPage,
});
export default connect(mapStateToProps, { incProduct, decProduct })(Cart);
