import React, { ComponentType, PureComponent } from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';

import { ProductType } from '../../generated/graphql';
import { withRouter, WithRouterProps } from '../../services/Hoc';
import { getProduct } from '../../services/selectors';
import { RootStateType } from '../../store/rootStore/rootReducer';
import ProductPage from '../../views/product/ProductPage';

import { getProductPage } from 'store/mainReducer/mainReducer';

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
    console.log('comdidmount');
    console.log('comdidmountparams', params.productsId);
    this.props.getProductPage(params.productsId);
  }

  render() {
    // const { loading, error, data } = this.props.allProducts;
    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error :(</p>;
    const data = this.props.productPage;
    console.log('ProductPageQuery', data);
    const { params } = this.props.match;

    // console.log('comdidmountparams', params.productsId);
    // console.log(
    //   'data',
    //   data?.category?.products.map(m => m?.id),
    // );

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
