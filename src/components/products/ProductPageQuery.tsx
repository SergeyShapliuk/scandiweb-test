import React, { ComponentType, PureComponent } from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';

import { withRouter, WithRouterProps } from '../../services/Hoc';
import { getProduct } from '../../services/selectors';
import { withQuery, WithQueryProps } from '../../services/useQueryHoc';
import { getProductPage } from '../../store/mainReducer/mainReducer';
import { RootStateType } from '../../store/rootStore/rootReducer';
import ProductPage from '../../views/product/ProductPage';

type MapStateToProps = {
  // productPage: ProductType;
};
type ProductPageQueryType = {
  // getProductPage: (productsId: string) => void;
};
interface Params {
  productsId: string;
}
export type ProductPageQueryTypes = WithQueryProps &
  WithRouterProps<Params> &
  MapStateToProps &
  ProductPageQueryType;
class ProductPageQuery extends PureComponent<ProductPageQueryTypes> {
  render() {
    const { loading, error, data } = this.props.allProducts;
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    const { params } = this.props.match;
    console.log('ProductPageQuery', data);
    return (
      data && (
        <>
          {' '}
          {data.category?.products.map(
            m => m?.id === params.productsId && <ProductPage key={m.id} product={m} />,
          )}
        </>
      )
    );
  }
}
const mapStateToProps = (state: RootStateType): MapStateToProps => ({
  productPage: getProduct(state),
});

export default compose<ComponentType>(
  connect<MapStateToProps, {}, {}, RootStateType>(mapStateToProps, {
    getProductPage,
  }),
  withRouter,
  withQuery,
)(ProductPageQuery);
