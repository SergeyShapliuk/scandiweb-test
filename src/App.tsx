import React, { ComponentType, ErrorInfo, PureComponent } from 'react';

import './App.css';

import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { compose } from 'redux';

import Header from './components/header/Header';
import CategoryProducts from './components/products/CategoryProducts';
import { initializeApp } from './store/mainReducer/mainReducer';
import { RootStateType } from './store/rootStore/rootReducer';
import ProductPage from './views/product/ProductPage';

type MapStateToProps = {
  initialized: boolean;
};
type AppType = MapStateToProps;

class App extends PureComponent<any, AppType> {
  componentDidMount() {
    this.props.initializeApp();
    console.log('compdidm');
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
          <Route path="/" element={<>All Product</>} />
          <Route path="/:productsName" element={<CategoryProducts />} />
          <Route path="/products/:productsId" element={<ProductPage />} />
          <Route path="/cart" element={<div />} />
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = (state: RootStateType): MapStateToProps => ({
  initialized: state.main.initialized,
});
export default compose<ComponentType>(connect(mapStateToProps, { initializeApp }))(App);
