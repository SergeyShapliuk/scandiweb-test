import React, { PureComponent } from 'react';

import s from './CartModal.module.css';

class CartModal extends PureComponent<any> {
  handleViewBtn = () => {
    // this.props.history.push('cart');
    // this.props.handleModal();
  };

  checkOut = () => {
    // if (this.props.products.length) {
    //   this.props.clearCart();
    //   this.props.handleModal();
    //   this.props.history.push('/');
    //   alert('products has been bought successfully');
    // } else {
    //   alert('add some product');
    // }
  };

  render() {
    // const { products } = this.props;
    return (
      <div className={s.container}>
        <h4 className={s.title}>
          My Bag
          <span className={s.titleSpan}>
            {/* {`, ${products.length} item${products.length === 1 ? '' : 's'}`} */}
          </span>
        </h4>
        {/* <CartProducts products={products} */}
        {/*              price={price} */}
        {/*              categories={categories} */}
        {/*              incCount={incCount} */}
        {/*              decCount={decCount} */}
        {/*              deleteItem={deleteItem} */}
        {/*              styles={styles} */}
        {/*              totalSum={totalSum} */}
        {/*              setTotalSum={setTotalSum} */}
        {/* /> */}
        <div className={s.buttons}>
          <button className={s.viewBtn} onClick={this.handleViewBtn}>
            view bag
          </button>
          <button className={s.checkoutButton} onClick={this.checkOut}>
            check out
          </button>
        </div>
      </div>
    );
  }
}

export default CartModal;
