import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { AttributeSet, ProductCartType, ProductType } from '../../generated/graphql';
import { getAttributeSet, getCurrency, getProductCart } from '../../services/selectors';
import { clearAttributes, setProductToCart } from '../../store/actionCreators';
import { RootStateType } from '../../store/rootStore';

import ProductAttributes from './ProductAttributes';
import s from './ProductPage.module.css';

type MapStateToProps = {
  productCart: ProductCartType[];
  attributeSet: AttributeSet[];
  currency: string;
};
type MapDispatchToProps = {
  addProductCart: (newProduct: ProductCartType) => void;
  getClearAttributes: () => void;
};
type ProductPageType = { product: ProductType } & MapStateToProps & MapDispatchToProps;

class ProductPage extends PureComponent<ProductPageType, { selectImage: any }> {
  constructor(props: ProductPageType) {
    super(props);
    this.state = {
      selectImage: null,
    };
  }

  componentWillUnmount() {
    this.props.getClearAttributes();
  }

  selectImg = (e: any) => {
    const image = e.target.src;
    return this.setState({ selectImage: image });
  };

  addToCart = () => {
    const { product, attributeSet, productCart } = this.props;
    if (attributeSet && attributeSet.length < (product.attributes?.length || 0)) {
      // eslint-disable-next-line no-alert
      alert('Please choose all or other attributes!');
      return;
    }
    const newProduct: ProductCartType = {
      name: product?.name,
      brand: product?.brand,
      category: product?.category,
      gallery: product?.gallery,
      id: product.id + Date.now(),
      prices: product?.prices,
      attributes: product?.attributes,
      attributeSet,
      count: 1,
    };
    const attributesValues = newProduct.attributeSet?.map(at =>
      at?.items?.map(v => v?.displayValue),
    );
    const attrName = newProduct.attributeSet?.map(at => at?.id);
    const res = productCart.find(f =>
      f.attributeSet?.every((p, pi) =>
        p?.items?.every(
          (n, ni) =>
            // @ts-ignore
            n?.id === newProduct?.attributeSet[pi].items[ni].id,
        ),
      ),
    );
    if (!res) {
      this.props.addProductCart(newProduct);
      this.props.getClearAttributes();
    } else {
      // eslint-disable-next-line no-alert
      alert(
        `This ${newProduct.name} (${attrName}:${attributesValues}) has been already added to the cart`,
      );
    }
  };

  render() {
    const { product, currency, productCart } = this.props;
    const { selectImage }: any = this.state;
    return (
      <div className={s.pictures}>
        <div className={s.picturesList}>
          {product &&
            product.gallery?.map((img: any) => (
              <div
                onClick={this.selectImg}
                className={s.pictureItem}
                key={img}
                aria-hidden
              >
                <img className={s.selectPicture} src={img} alt="img" />
              </div>
            ))}
        </div>
        <img
          className={s.selectedPicture}
          src={!selectImage ? product.gallery && product.gallery[0] : selectImage}
          alt="img"
        />
        <div>
          <h3 className={s.productBrand}>{product.brand}</h3>
          <h3 className={s.productName}>{product.name}</h3>

          <ProductAttributes product={product} productCart={productCart} />

          <p className={s.pricePara}>PRICE:</p>
          <p className={s.productPrice}>
            {product.prices.map(
              (prc: any) =>
                prc.currency.symbol === currency && `${prc.currency.symbol}${prc.amount}`,
            )}
          </p>
          <button
            onClick={this.addToCart}
            type="button"
            disabled={!product.inStock}
            className={s.submitBtn}
          >
            {!product.inStock ? 'OUT OF STOCK' : 'ADD TO CART'}
          </button>
          {product.description && (
            <div className={s.productDescription}>
              {product.description.replace(/(<([^>]+)>)/gi, '')}
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state: RootStateType): MapStateToProps => ({
  productCart: getProductCart(state),
  attributeSet: getAttributeSet(state),
  currency: getCurrency(state),
});
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToProps => ({
  addProductCart: (newProduct: ProductCartType) => dispatch(setProductToCart(newProduct)),
  getClearAttributes: () => dispatch(clearAttributes()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
