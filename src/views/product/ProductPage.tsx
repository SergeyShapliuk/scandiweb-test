import React, { PureComponent } from 'react';

import { connect } from 'react-redux';

import { AttributeSet, ProductCartType } from '../../generated/graphql';
import {
  addProductCart,
  getClearAttributes,
  getClearProductPage,
} from '../../store/mainReducer/mainReducer';
import { RootStateType } from '../../store/rootStore/rootReducer';

import ProductAttributes from './ProductAttributes';
import s from './ProductPage.module.css';

type MapStateToProps = {
  productCart: ProductCartType[];
  attributes: AttributeSet[];
  currency: string;
};

type ProductPageType = {
  product: any;
  addProductCart: (newProduct: ProductCartType) => void;
  getClearProductPage: () => void;
  // getClearAttributes: () => void;
};
type ProductPageTypes = MapStateToProps & ProductPageType;

class ProductPage extends PureComponent<ProductPageTypes> {
  constructor(props: ProductPageTypes) {
    super(props);
    this.state = {
      selectImage: null,
    };
  }

  componentWillUnmount() {
    // this.props.getClearAttributes();
    this.props.getClearProductPage();
  }

  selectImg = (e: any) => {
    const image = e.target.src;
    return this.setState({ selectImage: image });
  };

  addToCart = () => {
    const { product, attributes, productCart } = this.props;
    if (attributes && attributes.length < (product.attributes?.length || 0)) {
      console.log('atriibutes.reducer', attributes);
      console.log('atriibutes.product.attributes', product.attributes);
      // eslint-disable-next-line no-alert
      alert('Please choose all attributes!');
    }
    const newProduct: ProductCartType = {
      name: product?.name,
      brand: product?.brand,
      category: product?.category,
      gallery: product?.gallery,
      id: product.id,
      prices: product?.prices,
      attributesSet: product?.attributes,
      attributes,
      count: 1,
    };
    const attributesValues = newProduct.attributes?.map(at =>
      at?.items?.map(v => v?.value),
    );
    const attrId = newProduct.attributes?.map(at => at?.id);
    // const defaultAttributes = product.attributes?.filter(m => m);
    // console.log('defaultAttributes', defaultAttributes);
    const res = productCart
      .filter(v => v.id === newProduct.id)
      .find(f =>
        f.attributes?.every((p, pi) =>
          p?.items?.every(
            (n, ni) =>
              // @ts-ignore
              n.value === newProduct.attributes[pi].items[ni].value,
          ),
        ),
      );
    if (!res) {
      this.props.addProductCart(newProduct);
      console.log('newProduct', newProduct);
    } else {
      // eslint-disable-next-line no-alert
      alert(
        `This ${newProduct.name} ${attrId} ${attributesValues} has been already added to the cart`,
      );
    }
  };

  render() {
    const { product, currency } = this.props;
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

          <ProductAttributes product={product} />

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
  productCart: state.main.productCart,
  attributes: state.main.attributes,
  currency: state.main.currency,
});
export default connect(mapStateToProps, {
  addProductCart,
  getClearProductPage,
  getClearAttributes,
})(ProductPage);
