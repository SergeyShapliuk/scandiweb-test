import { Dispatch } from 'redux';

import { client } from '../../components/AppoloClient';
import { CategoryProductQuery, ProductType } from '../../generated/graphql';
import { getProduct, getProductCategories } from '../../graphql/queries';

const initialState = {
  initialized: false,
  allProducts: {} as CategoryProductQuery,
  productPage: {} as ProductType,
};

type InitialStateType = typeof initialState;

export const mainReducer = (
  state = initialState,
  action: ActionsType,
): InitialStateType => {
  switch (action.type) {
    case 'INITIALIZED_SUCCESS':
      return { ...state, initialized: true };
    case 'SET_ALL_PRODUCTS':
      return { ...state, allProducts: action.value };
    case 'SET_PRODUCT':
      return { ...state, productPage: action.value };
    default:
      return state;
  }
};

export const initializedSuccess = () => ({ type: 'INITIALIZED_SUCCESS' } as const);
export const setAllProducts = (value: CategoryProductQuery) =>
  ({ type: 'SET_ALL_PRODUCTS', value } as const);
export const setProduct = (value: ProductType) =>
  ({ type: 'SET_PRODUCT', value } as const);

export const initializeApp = () => async (dispatch: Dispatch<ActionsType>) => {
  const data = await client.query({
    query: getProductCategories,
  });
  if (!data.loading) {
    dispatch(setAllProducts(data.data));
    dispatch(initializedSuccess());
  }
};
export const getProductPage =
  (productId: string) => async (dispatch: Dispatch<ActionsType>) => {
    // eslint-disable-next-line no-debugger
    debugger;
    const data = await client.query({
      query: getProduct(productId),
    });
    if (!data.loading) {
      dispatch(setProduct(data.data));
      console.log('productReducer', data.data);
    }
  };

type ActionsType =
  | ReturnType<typeof setProduct>
  | ReturnType<typeof initializedSuccess>
  | ReturnType<typeof setAllProducts>;
