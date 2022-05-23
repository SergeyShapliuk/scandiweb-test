import { ComponentType } from 'react';

import {
  CategoryProductQueryHookResult,
  GetCurrenciesQueryHookResult,
  GetProductCategoriesNameQueryHookResult,
  useCategoryProductQuery,
  useGetCurrenciesQuery,
  useGetProductCategoriesNameQuery,
} from '../graphql/graphql';

export interface WithQueryProps {
  queryCategoryName: GetProductCategoriesNameQueryHookResult;
  queryCategoryProduct: CategoryProductQueryHookResult;
  // allProducts: AllCategoryQueryHookResult;
  getCurrencies: GetCurrenciesQueryHookResult;
}
export const withQuery = <P extends object>(Component: ComponentType<P>) =>
  function foo(props: any) {
    const queryCategoryName = useGetProductCategoriesNameQuery();
    const queryCategoryProduct = useCategoryProductQuery();
    const getCurrencies = useGetCurrenciesQuery();

    return (
      <Component
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...(props as P)}
        queryCategoryName={queryCategoryName}
        queryCategoryProduct={queryCategoryProduct}
        // allProducts={allProducts}
        getCurrencies={getCurrencies}
      />
    );
  };
