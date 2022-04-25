import { ComponentType } from 'react';

import {
  AllCategoryQueryHookResult,
  CategoryProductQueryHookResult,
  GetProductCategoriesNameQueryHookResult,
  useAllCategoryQuery,
  useCategoryProductQuery,
  useGetProductCategoriesNameQuery,
} from '../generated/graphql';

export interface WithQueryProps {
  queryCategoryName: GetProductCategoriesNameQueryHookResult;
  queryCategoryProduct: CategoryProductQueryHookResult;
  allProducts: AllCategoryQueryHookResult;
}
export const withQuery = <P extends object>(Component: ComponentType<P>) =>
  function foo(props: any) {
    const queryCategoryName = useGetProductCategoriesNameQuery();
    const queryCategoryProduct = useCategoryProductQuery();
    const allProducts = useAllCategoryQuery();

    return (
      <Component
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...(props as P)}
        queryCategoryName={queryCategoryName}
        queryCategoryProduct={queryCategoryProduct}
        allProducts={allProducts}
      />
    );
  };
