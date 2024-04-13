import React, { PureComponent } from 'react';

import './App.css';

import { Navigate, Routes, Route } from 'react-router-dom';

import Header from './components/header/Header';
import CategoryProductsQuery from './components/productsQuery/CategoryProductsQuery';
import ProductPageQuery from './components/productsQuery/ProductPageQuery';
import Welcome from './components/welcome/Welcome';
import { withRouter, WithRouterProps } from './services/useRouterHoc';
import Cart from './views/cart/Cart';

// function Layout() {
//   return (
//     <>
//       <Header />
//       <Outlet />
//     </>
//   );
// }

class App extends PureComponent<WithRouterProps> {
  componentDidMount() {
    if (this.props.location.pathname !== '/shop') {
      this.props.history.push('/shop');
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Routes>
          {/* <Route path="/" element={<Layout />}> */}
          <Route path="/shop" element={<Welcome />} />
          <Route path="/:categoryName" element={<CategoryProductsQuery />} />
          <Route path="/:categoryName/:productsId" element={<ProductPageQuery />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Navigate to="/shop" />} />
          {/* </Route> */}
        </Routes>
      </div>
    );
  }
}

export default withRouter(App);
