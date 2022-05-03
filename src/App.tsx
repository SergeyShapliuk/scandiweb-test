import React, { ComponentType, ErrorInfo, PureComponent } from 'react';

import './App.css';

import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { compose } from 'redux';

import Header from './components/header/Header';
import CategoryProductsQuery from './components/products/CategoryProductsQuery';
import ProductPageQuery from './components/products/ProductPageQuery';
import { initializeApp } from './store/mainReducer/mainReducer';
import { RootStateType } from './store/rootStore/rootReducer';
import Cart from './views/cart/Cart';

type MapStateToProps = {
  initialized: boolean;
};
type AppType = {
  initializeApp: () => void;
};
export type AppTypes = MapStateToProps & AppType;

class App extends PureComponent<AppTypes> {
  componentDidMount() {
    this.props.initializeApp();
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log(error, info);
  }

  render() {
    if (!this.props.initialized) {
      return <div>Loading.........</div>;
    }
    return (
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<div>All product</div>} />
          <Route path="/:productsName" element={<CategoryProductsQuery />} />
          <Route path="/products/:productsId" element={<ProductPageQuery />} />
          <Route path="/cart" element={<Cart showModal={false} />} />
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = (state: RootStateType): MapStateToProps => ({
  initialized: state.main.initialized,
});
export default compose<ComponentType>(
  connect<MapStateToProps, {}, {}, RootStateType>(mapStateToProps, {
    initializeApp,
  }),
)(App);
