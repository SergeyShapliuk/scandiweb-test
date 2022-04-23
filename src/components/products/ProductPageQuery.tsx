import React, { PureComponent } from 'react';

import { withRouter, WithRouterProps } from '../../services/Hoc';

interface Params {
  productId: string;
}

type Props = WithRouterProps<Params>;
class ProductPageQuery extends PureComponent<Props> {
  render() {
    const { match } = this.props;
    const productId = match;
    console.log('productId', productId);

    return <div>{productId.params.productId}</div>;
  }
}

export default withRouter(ProductPageQuery);
