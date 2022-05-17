import React, { ComponentType, PureComponent } from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';

import { ProductType } from '../../graphql/graphql';
import { withRouter, WithRouterProps } from '../../services/useRouterHoc';
import { RootStateType } from '../../store/rootStore';
import { getProduct } from '../../utils/selectors';
import ProductPage from '../../views/product/ProductPage';

import { getProductPage } from 'store/mainReducer';

type MapStateToProps = {
  productPage: ProductType;
};
type ProductPageQueryType = {
  getProductPage: (productsId: string) => void;
};
interface Params {
  productsId: string;
}
export type ProductPageQueryTypes = WithRouterProps<Params> &
  MapStateToProps &
  ProductPageQueryType;
class ProductPageQuery extends PureComponent<ProductPageQueryTypes> {
  componentDidMount() {
    const { params } = this.props.match;
    this.props.getProductPage(params.productsId);
  }

  render() {
    const data = this.props.productPage;
    const { params } = this.props.match;
    return (
      data.id === params.productsId && (
        <div>
          <ProductPage product={data} />,
        </div>
      )
    );
  }
}
const mapStateToProps = (state: RootStateType): MapStateToProps => ({
  productPage: getProduct(state),
});

export default compose<ComponentType>(
  connect(mapStateToProps, { getProductPage }),
  withRouter,
)(ProductPageQuery);
