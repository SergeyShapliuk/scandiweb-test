import React, { PureComponent } from 'react';

import { withQuery, WithQueryProps } from '../../services/useQueryHoc';
import { withRouter, WithRouterProps } from '../../services/useRouterHoc';
import ProductsList from '../../views/products/ProductsList';

interface Params {
  productsName: string;
}
type CategoryProductsType = WithQueryProps & WithRouterProps<Params>;

class CategoryProductsQuery extends PureComponent<CategoryProductsType> {
  render() {
    const { loading, error, data } = this.props.queryCategoryProduct;
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    const { params } = this.props.match;
    return (
      data && (
        <div>
          {data.categories?.map(
            m =>
              m?.name === params.productsName && (
                <ProductsList name={m.name} key={m.name} data={m} />
              ),
          )}
        </div>
      )
    );
  }
}
export default withRouter(withQuery(CategoryProductsQuery));
