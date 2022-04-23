import React from 'react';

class ProductPageDescription extends React.Component {
  render() {
    return (
      <div className="pictures">
        <ul className="pictures-list">
          {product &&
            product.gallery.map(img => (
              <li onClick={this.selectImg} className="picture-item" key={img}>
                <img className="select-picture" src={img} alt="img" />
              </li>
            ))}
        </ul>
        <img
          className="selected-picture"
          src={!selectImage ? product.gallery[0] : selectImage}
          alt="img"
        />
        <div>
          <h3 className="product-brand">{product.brand}</h3>
          <h3 className="product-name">{product.name}</h3>
          <ProductAttributes
            updateName={this.updateName}
            updateId={this.updateId}
            updateState={this.updateState}
            activeAtr={this.setActiveAttribute}
            product={product}
          />
          <p className="price-para">PRICE:</p>
          <p className="product-price">
            {product.prices.map(
              prc =>
                prc.currency.symbol === this.props.currency &&
                `${prc.currency.symbol} ${prc.amount}`,
            )}
          </p>
          <button
            type="button"
            onClick={this.addProductToCart}
            disabled={!product.inStock && true}
            className="submitBtn"
          >
            {!product.inStock ? 'OUT OF STOCK' : 'ADD TO CART'}
          </button>
          {product.description && (
            <div className="product-description">{parse(product.description)}</div>
          )}
        </div>
      </div>
    );
  }
}

export default ProductPageDescription;
