import { PureComponent } from 'react';

import { withQuery, WithQueryProps } from '../../services/useQueryHoc';

type AllProductsQueryType = WithQueryProps;

class AllProductsQuery extends PureComponent<AllProductsQueryType> {
  render() {
    const { loading, error, data } = this.props.allProducts;
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return data && <> dfgdf</>;
  }
}

export default withQuery(AllProductsQuery);
