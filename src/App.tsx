import React, { ComponentType, PureComponent } from 'react';

import './App.css';

import { connect } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { compose } from 'redux';

import Header from './components/header/Header';
import Preloader from './components/preloader/Preloader';
import CategoryProductsQuery from './components/productsQuery/CategoryProductsQuery';
import ProductPageQuery from './components/productsQuery/ProductPageQuery';
import { getInitialized } from './services/selectors';
import { initializeApp } from './store/mainReducer';
import { RootStateType } from './store/rootStore';
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
  initialized: getInitialized(state),
});
export default compose<ComponentType>(
  connect(mapStateToProps, {
    initializeApp,
  }),
)(App);
