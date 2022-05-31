import { ComponentType } from 'react';

import {
  GetCurrenciesQueryHookResult,
  GetProductCategoriesNameQueryHookResult,
  useGetCurrenciesQuery,
  useGetProductCategoriesNameQuery,
} from '../graphql/graphql';

export interface WithQueryProps {
  queryCategoryName: GetProductCategoriesNameQueryHookResult;
  getCurrencies: GetCurrenciesQueryHookResult;
}
export const withQuery = <P extends object>(Component: ComponentType<P>) =>
  function foo(props: any) {
    const queryCategoryName = useGetProductCategoriesNameQuery();
    const getCurrencies = useGetCurrenciesQuery();

    return (
      <Component
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...(props as P)}
        queryCategoryName={queryCategoryName}
        getCurrencies={getCurrencies}
      />
    );
  };
