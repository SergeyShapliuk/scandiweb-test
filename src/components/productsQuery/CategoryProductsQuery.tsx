import React, { ComponentType, PureComponent } from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';

import { Category } from '../../graphql/graphql';
import { withRouter, WithRouterProps } from '../../services/useRouterHoc';
import { getProductsCategory } from '../../store/mainReducer';
import { RootStateType } from '../../store/rootStore';
import { getInitialized, getProductCategory } from '../../utils/selectors';
import ProductsList from '../../views/products/ProductsList';
import Preloader from '../preloader/Preloader';

interface Params {
  categoryName: string;
}
type MapStateToProps = {
  productCategory: Category;
  initialized: boolean;
};
type CategoryProductsType = {
  getProductsCategory: (categoryName: string) => void;
} & MapStateToProps &
  WithRouterProps<Params>;

class CategoryProductsQuery extends PureComponent<CategoryProductsType> {
  componentDidMount() {
    this.getCategory();
  }

  componentDidUpdate(prevProps: Readonly<CategoryProductsType>) {
    if (this.props.match.params?.categoryName !== prevProps.match.params?.categoryName) {
      this.getCategory();
    }
  }

  getCategory() {
    const { params } = this.props.match;
    this.props.getProductsCategory(params.categoryName);
  }

  render() {
    const data = this.props.productCategory;
    const { params } = this.props.match;
    if (!this.props.initialized) {
      return <Preloader />;
    }
    return (
      data?.name === params.categoryName && (
        <div>
          <ProductsList data={data} key={data?.name} />
        </div>
      )
    );
  }
}

const mapStateToProps = (state: RootStateType): MapStateToProps => ({
  productCategory: getProductCategory(state),
  initialized: getInitialized(state),
});

export default compose<ComponentType>(
  connect(mapStateToProps, { getProductsCategory }),
  withRouter,
)(CategoryProductsQuery);
