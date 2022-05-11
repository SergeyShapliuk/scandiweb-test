import React, { ComponentType, PureComponent } from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';

import { GetProductQuery, ProductType } from "../../generated/graphql";
import { withRouter, WithRouterProps } from '../../services/Hoc';
import { getProduct } from '../../services/selectors';
import { withQuery, WithQueryProps } from '../../services/useQueryHoc';
import { getProductPage } from '../../store/mainReducer/mainReducer';
import { RootStateType } from '../../store/rootStore/rootReducer';
import ProductPage from '../../views/product/ProductPage';

type MapStateToProps = {
  productPage: GetProductQuery;
  allProducts:

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
class ProductPageQuery extends PureComponent<ProductPageQueryTypes> {
  componentDidMount() {
    // eslint-disable-next-line no-debugger
    debugger;
    const { params } = this.props.match;
    console.log('comdidmount');
    console.log('comdidmountparams', params.productsId);
    this.props.getProductPage(params.productsId);
  }
  // componentWillUnmount() {
  //
  // }

  render() {
    // eslint-disable-next-line no-debugger
    debugger;
    const { product } = this.props.productPage;
    console.log('ProductPageQuery', product);
    const { params } = this.props.match;

    console.log('comdidmountparams', params.productsId);

    return (
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
