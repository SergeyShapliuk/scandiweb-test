import React, { PureComponent } from 'react';

import { withRouter, WithRouterProps } from '../../services/Hoc';

interface Params {
  productsId: string;
}
type ProductPageType = WithRouterProps<Params>;
class ProductPage extends PureComponent<ProductPageType> {
  render() {
    const { params } = this.props.match;
    console.log('page', params.productsId);
    return <div>product </div>;
  }
}

export default withRouter(ProductPage);
