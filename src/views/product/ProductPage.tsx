import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { AttributeSet, ProductCartType, ProductType } from '../../graphql/graphql';
import {
  clearAttributes,
  setIncProductCount,
  setProductToCart,
} from '../../store/actionCreators';
import { RootStateType } from '../../store/rootStore';
import { getAttributeSet, getCurrency, getProductCart } from '../../utils/selectors';

import ProductAttributes from './ProductAttributes';
import s from './ProductPage.module.scss';

type MapStateToProps = {
  productCart: ProductCartType[];
  attributeSet: AttributeSet[];
  currency: string;
};
type MapDispatchToProps = {
  addProductCart: (newProduct: ProductCartType) => void;
  getClearAttributes: () => void;
  getIncProductCount: (id: string) => void;
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
    if (attributeSet.length < (product.attributes?.length || 0)) {
      // eslint-disable-next-line no-alert
      alert('Please choose all or other attributes!');
      return;
    }
    const uuid = attributeSet.map(m => m.items?.map(me => me?.id));
    const newProduct: ProductCartType = {
      name: product?.name,
      brand: product?.brand,
      category: product?.category,
      gallery: product?.gallery,
      id: product.id + uuid,
      prices: product?.prices,
      attributes: product?.attributes,
      attributeSet,
      count: 1,
    };
    // const attributesValues = newProduct.attributeSet?.map(at =>
    //   at?.items?.map(v => v?.displayValue),
    // );
    // const attrName = newProduct.attributeSet?.map(at => at?.id);

    const result = productCart
      .filter(prod => prod.name === newProduct.name)
      .find(f =>
        f.attributeSet?.every((atr, atrIndex) =>
          atr?.items?.every(
            (item, itemIndex) =>
              // @ts-ignore
              item?.id === newProduct?.attributeSet[atrIndex].items[itemIndex].id,
          ),
        ),
      );
    if (!result) {
      this.props.addProductCart(newProduct);
      this.props.getClearAttributes();
    } else {
      this.props.getIncProductCount(newProduct.id);
      this.props.getClearAttributes();
    }
  };

  render() {
    const { product, currency, productCart } = this.props;
    const { selectImage }: any = this.state;
    return (
      <div className={s.pageContainer}>
        <div>
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

          <ProductAttributes product={product} productToCart={productCart} />

          <p className={s.price}>PRICE:</p>
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
            className={s.btnAdd}
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
  getIncProductCount: (id: string) => dispatch(setIncProductCount(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
