import React, { ComponentType, PureComponent } from 'react';

import './App.css';

import { connect } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { compose } from 'redux';

import Header from './components/header/Header';
import Preloader from './components/preloader/Preloader';
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

  render() {
    // eslint-disable-next-line no-debugger
    debugger;
    if (!this.props.initialized) {
      return <Preloader />;
    }
    return (
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/all" />} />
          <Route path="/:productsName" element={<CategoryProductsQuery />} />
          <Route path="/:productsName/:productsId" element={<ProductPageQuery />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = (state: RootStateType): MapStateToProps => ({
  initialized: state.main.initialized,
});
export default compose<ComponentType>(
  connect(mapStateToProps, {
    initializeApp,
  }),
)(App);
