import { PureComponent } from 'react';

import { withQuery, WithQueryProps } from '../../services/useQueryHoc';

type AllProductsQueryType = WithQueryProps;

class AllProductsQuery extends PureComponent<AllProductsQueryType> {
  render() {
    // eslint-disable-next-line no-debugger
    debugger;
    const { loading, error, data } = this.props.allProducts;
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return data && <> dfgdf</>;
  }
}

export default withQuery(AllProductsQuery);
