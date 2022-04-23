import React, { PureComponent } from 'react';

import { withRouter, WithRouterProps } from '../../services/Hoc';
import { withQuery, WithQueryProps } from '../../services/useQueryHoc';
import ProductsList from '../../views/ProductsList';

// type MapStateToPropsType = {
//   data: CategoryProductQuery;
// };
interface Params {
  productsName: string;
}
type CategoryProductsType = WithQueryProps & WithRouterProps<Params>;

class CategoryProducts extends PureComponent<CategoryProductsType> {
  render() {
    const { loading, error, data } = this.props.queryCategoryProduct;
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    console.log('allProductssss', JSON.stringify(data?.categories));
    const { params } = this.props.match;
    console.log('paramsProducts', params.productsName);
    return (
      <div>
        {/* <ProductsList data={this.props.allProducts.data?.category} />; */}
        {this.props.queryCategoryProduct.data?.categories?.map(
          m => m?.name === params.productsName && <ProductsList key={m.name} data={m} />,
        )}
      </div>
    );
  }
}
// const mapStateToProps = (state: RootStateType): MapStateToPropsType => ({
//   allProducts: state.main.allProducts,
// });
export default withRouter(withQuery(CategoryProducts));
