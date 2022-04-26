import React, { ComponentType, PureComponent } from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';

import { ProductType } from '../../generated/graphql';
import { withRouter, WithRouterProps } from '../../services/Hoc';
import { getProduct } from '../../services/selectors';
import { withQuery, WithQueryProps } from '../../services/useQueryHoc';
import { getProductPage } from '../../store/mainReducer/mainReducer';
import { RootStateType } from '../../store/rootStore/rootReducer';
import ProductPage from '../../views/product/ProductPage';

type MapStateToProps = {
  productPage: ProductType;
};
type ProductPageQueryType = {
  getProductPage: (productsId: string) => void;
};
interface Params {
  productsId: string;
}
export type ProductPageQueryTypes = WithQueryProps &
  WithRouterProps<Params> &
  MapStateToProps &
  ProductPageQueryType;
class ProductPageQuery extends PureComponent<any, ProductPageQueryTypes> {
  componentDidMount() {
    const { params } = this.props.match;
    console.log('comdidmount');
    console.log('comdidmountparams', params.productsId);
    this.props.getProductPage(params.productsId);
  }

  render() {
    const product = this.props.productPage;
    console.log('productPage', product);
    return (
      product.id && (
        <div>
          <ProductPage product={product} />
        </div>
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
