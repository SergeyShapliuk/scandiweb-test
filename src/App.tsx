import React, { PureComponent } from 'react';

import './App.css';

import { Routes, Route, Outlet } from 'react-router-dom';

import Header from './components/header/Header';
import CategoryProductsQuery from './components/productsQuery/CategoryProductsQuery';
import ProductPageQuery from './components/productsQuery/ProductPageQuery';
import Cart from './views/cart/Cart';

function Layout1() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

class App extends PureComponent {
  render() {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout1 />}>
            <Route path="/:categoryName" element={<CategoryProductsQuery />} />
            <Route path="/:categoryName/:productsId" element={<ProductPageQuery />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Routes>
      </div>
    );
  }
}

export default App;
