import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Carousel from '../../components/carousel/Carousel';
import { AttributeSet, ProductCartType } from '../../graphql/graphql';
import {
  removeProductFromCart,
  setDecProductCount,
  setIncProductCount,
  setTotalSum,
} from '../../store/actionCreators';
import { RootStateType } from '../../store/rootStore';
import {
  getAttributeSet,
  getCurrency,
  getProductCart,
  getProductsCount,
  getTotalSum,
} from '../../utils/selectors';

import s from './Cart.module.scss';

type MapStateToProps = {
  productCart: ProductCartType[];
  currency: string;
  attributeSet: AttributeSet[];
  productsCount: number;
  totalSum: number;
};
type MapDispatchToProps = {
  incProduct: (id: string) => void;
  decProduct: (id: string) => void;
  getTotalSum: () => void;
  removeProductFromCart: (productId: string) => void;
};
type CartType = {
  showModal?: boolean;
};
class Cart extends PureComponent<MapStateToProps & MapDispatchToProps & CartType> {
  componentDidMount() {
    this.props.getTotalSum();
  }

  componentDidUpdate(
    prevProps: Readonly<MapStateToProps & MapDispatchToProps & CartType>,
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

  isButtonSelected = (name: string, id: string, item: ProductCartType) =>
    this.props.productCart
      .find(p => p.id === item.id)
      ?.attributeSet?.find(fe => fe?.id === name)
      ?.items?.find(fr => fr?.id === id);

  render() {
    const { productCart, currency, showModal, productsCount, totalSum } = this.props;
    return (
      <div className={s.cartBlock}>
        {!showModal && <div className={s.cartTitle}>Cart</div>}
        {productCart.map(item => (
          <div key={item.id} className={!showModal ? s.cartLine : ''}>
            <div className={s.cartContainer}>
              <div className={s.attributeContainer}>
                <div className={showModal ? s.brandModal : s.brandCart}>{item.brand}</div>
                <div className={showModal ? s.nameModal : s.nameCart}>{item.name}</div>
                <div className={showModal ? s.priceModal : s.priceCart}>
                  {item.prices.map(
                    price =>
                      price.currency.symbol === currency &&
                      `${price.currency.symbol} ${price.amount}`,
                  )}
                </div>
                {item.attributes?.map(m => (
                  <div key={m?.id} className={s.attributesContainer}>
                    <h2 className={showModal ? s.titleModal : s.titleCart}>{m?.name}:</h2>
                    <div className={s.list}>
                      {m?.items?.map(a =>
                        m.type !== 'swatch' ? (
                          <button
                            aria-hidden
                            type="button"
                            id={a?.id}
                            name={a!.id}
                            value={a?.value}
                            className={`${
                              showModal ? s.attributeItemModal : s.attributeItem
                            } ${
                              this.isButtonSelected(m.id, a!.id, item) ? s.active : ''
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
                            className={`${
                              showModal
                                ? s.attributeItemSwatchModal
                                : s.attributeItemSwatch
                            } ${
                              this.isButtonSelected(m.id, a!.id, item)
                                ? s.activeSwatch
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
              </div>
              <div className={s.galleryBlock}>
                <div className={s.galleryContainer}>
                  <div className={showModal ? s.counterModal : s.counter}>
                    <button
                      value={item.id}
                      type="button"
                      onClick={() => this.increment(item.id)}
                      className={s.button}
                    >
                      +
                    </button>
                    <span className={showModal ? s.valueModal : s.value}>
                      {item.count}
                    </span>
                    <button
                      value={item.id}
                      type="button"
                      onClick={() => this.decrement(item.id, item.count)}
                      className={s.button}
                    >
                      -
                    </button>
                  </div>
                  {!showModal && item.gallery?.length !== 1 ? (
                    <Carousel>
                      {item.gallery?.map(image => (
                        <img key={image} src={image} alt="" />
                      ))}
                    </Carousel>
                  ) : (
                    <img
                      src={item.gallery && item.gallery[0]}
                      className={showModal ? s.image : s.imageModal}
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
            <div className={s.quantity}>
              Quantity: <span> {productsCount}</span>
            </div>
          )}

          <div className={showModal ? s.totalTitleModal : s.totalTitleCart}>
            Total:{' '}
            <span
              className={showModal ? s.totalPriceModal : s.totalPriceCart}
            >{`${currency}${Math.round(totalSum * 100) / 100}`}</span>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state: RootStateType): MapStateToProps => ({
  productCart: getProductCart(state),
  currency: getCurrency(state),
  attributeSet: getAttributeSet(state),
  productsCount: getProductsCount(state),
  totalSum: getTotalSum(state),
});
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToProps => ({
  incProduct: (id: string) => dispatch(setIncProductCount(id)),
  decProduct: (id: string) => dispatch(setDecProductCount(id)),
  getTotalSum: () => dispatch(setTotalSum()),
  removeProductFromCart: (productId: string) =>
    dispatch(removeProductFromCart(productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
