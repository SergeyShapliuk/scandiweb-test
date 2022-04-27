import { Dispatch } from 'redux';

import { client } from '../../components/AppoloClient';
import {
  AttributeSet,
  CategoryProductQuery,
  ProductCartType,
  ProductType,
} from '../../generated/graphql';
import { getProduct, getProductCategories } from '../../graphql/queries';

const initialState = {
  initialized: false,
  allProducts: {} as CategoryProductQuery,
  productPage: {} as ProductType,
  attributes: [] as AttributeSet[],
  productCart: {} as ProductCartType,
  currency: '$' as string,
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
    case 'SET_ATTRIBUTES':
      return { ...state, attributes: action.attribute };
    case 'SET_CURRENCY':
      return { ...state, currency: action.currency };
    case 'SET_PRODUCT_TO_CART':
      return { ...state, productCart: action.product };

    default:
      return state;
  }
};

export const initializedSuccess = () => ({ type: 'INITIALIZED_SUCCESS' } as const);
export const setAllProducts = (value: CategoryProductQuery) =>
  ({ type: 'SET_ALL_PRODUCTS', value } as const);
export const setProduct = (value: ProductType) =>
  ({ type: 'SET_PRODUCT', value } as const);
export const setAttributes = (attribute: AttributeSet[]) =>
  ({ type: 'SET_ATTRIBUTES', attribute } as const);
export const setCurrency = (currency: string) =>
  ({ type: 'SET_CURRENCY', currency } as const);
export const setProductToCart = (product: ProductCartType) =>
  ({ type: 'SET_PRODUCT_TO_CART', product } as const);

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
    const data = await client.query({
      query: getProduct(productId),
    });
    if (!data.loading) {
      dispatch(setProduct(data.data.product));
      console.log('productReducer', data.data.product);
    }
  };
export const changeCurrencies =
  (currency: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setCurrency(currency));
  };
export const addAttributes =
  (attribute: AttributeSet[]) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAttributes(attribute));
  };
export const addProductCart =
  (newProduct: ProductCartType) => (dispatch: Dispatch<ActionsType>) => {
    // eslint-disable-next-line no-debugger
    debugger;
    dispatch(setProductToCart(newProduct));
  };
type ActionsType =
  | ReturnType<typeof setProduct>
  | ReturnType<typeof initializedSuccess>
  | ReturnType<typeof setAllProducts>
  | ReturnType<typeof setAttributes>
  | ReturnType<typeof setCurrency>
  | ReturnType<typeof setProductToCart>;
