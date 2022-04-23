import { PureComponent } from 'react';

import { withQuery, WithQueryProps } from '../../services/useQueryHoc';
import ProductsList from '../../views/ProductsList';

type AllProductsQueryType = WithQueryProps;

class AllProductsQuery extends PureComponent<AllProductsQueryType> {
  render() {
    const { loading, error, data } = this.props.allProducts;
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    console.log('allProduct', JSON.stringify(data));
    return <ProductsList data={this.props.allProducts.data?.category} />;
  }
}

export default withQuery(AllProductsQuery);
