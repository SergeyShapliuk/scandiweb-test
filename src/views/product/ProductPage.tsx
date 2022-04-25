import React, { PureComponent } from 'react';

import s from './ProductPage.module.css';

type ProductPageType = {
  product: any;
};

class ProductPage extends PureComponent<ProductPageType> {
  constructor(props: ProductPageType) {
    super(props);
    state : {
      selectImage: null,
    };
    };
  }



  selectImg = (e: any) => {
    const image = e.target.src;
    return this.setState({
      selectImage: image,
    });
  };

  render() {
    const { selectImage } = this.state;
    const { product } = this.props;
    console.log('ProductPage', product);
    return (
      <div className={s.pictures}>
        <div className={s.picturesList}>
          {product &&
            product.gallery?.map((img: any) => (
              <div
                aria-hidden
                className={s.pictureItem}
                onClick={this.selectImg}
                key={img}
              >
                <img className={s.selectPicture} src={img} alt="img" />
              </div>
            ))}
        </div>
        <img
          className={s.selectedPicture}
          src={!selectImage ? product.gallery[0] : selectImage}
          alt="img"
        />
        <div>
          <h3 className={s.productBrand}>{product.brand}</h3>
          <h3 className={s.productName}>{product.name}</h3>
          {/*  /!* <ProductAttributes *!/ */}
          {/*  /!*  updateName={this.updateName} *!/ */}
          {/*  /!*  updateId={this.updateId} *!/ */}
          {/*  /!*  updateState={this.updateState} *!/ */}
          {/*  /!*  activeAtr={this.setActiveAttribute} *!/ */}
          {/*  /!*  product={product} *!/ */}
          {/*  /!* /> *!/ */}
          <p className={s.pricePara}>PRICE:</p>
          <p className={s.productPrice}>
            {product.prices.map((prc: any) => prc.currency.symbol)}
          </p>
          <button
            type="button"
            disabled={!product.inStock && true}
            className={s.submitBtn}
          >
            {!product.inStock ? 'OUT OF STOCK' : 'ADD TO CART'}
          </button>
          {product.description && (
            <div className={s.productDescription}>{product.description}</div>
          )}
        </div>
      </div>
    );
  }
}

export default ProductPage;
