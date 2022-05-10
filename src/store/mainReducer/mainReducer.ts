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
  productCart: [] as ProductCartType[],
  currency: '$' as string,
  productsCount: 0,
  totalSum: 0,
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
      if (state.productCart.find(f => f.id === action.productId)) {
        return {
          ...state,
          attributes: state.attributes.map(val =>
            val.id === action.attribute.id ? action.attribute : val,
          ),
        };
      }
      return {
        ...state,
        attributes: [...state.attributes, action.attribute],
      };
    // case 'SET_DEFAULT_ATTRIBUTES':
    //   return { ...state, defaultAttributes: action.attributes };
    case 'SET_CURRENCY':
      return { ...state, currency: action.currency };
    case 'SET_PRODUCT_TO_CART':
      return {
        ...state,
        productCart: [...state.productCart, action.product],
      };
    case 'SET_INC_PRODUCT_COUNT':
      return {
        ...state,
        productCart: state.productCart.map(m =>
          m.id === action.id ? { ...m, count: m.count + 1 } : m,
        ),
      };
    case 'SET_DEC_PRODUCT_COUNT':
      return {
        ...state,
        productCart: state.productCart.map(m =>
          m.id === action.id ? { ...m, count: m.count - 1 } : m,
        ),
      };
    case 'SET_PRODUCT_COUNT':
      return {
        ...state,
        productsCount: action.count,
      };
    case 'SET_TOTAL_SUM':
      return {
        ...state,
        totalSum: state.productCart
          .map(
            v =>
              (v.prices.find(val => val.currency.symbol === state.currency)?.amount ||
                0) * v.count,
          )
          .reduce((acc, it) => (acc || 0) + (it || 0), 0),
      };

    case 'CLEAR_CART':
      return { ...state, productCart: [] };
    case 'CLEAR_ATTRIBUTES':
      return { ...state, attributes: [] };
    case 'REMOVE_PRODUCT_FROM_CART':
      return {
        ...state,
        productCart: state.productCart.filter(f => f.id !== action.productId),
      };
    default:
      return state;
  }
};

export const initializedSuccess = () => ({ type: 'INITIALIZED_SUCCESS' } as const);
export const setAllProducts = (value: CategoryProductQuery) =>
  ({ type: 'SET_ALL_PRODUCTS', value } as const);
export const setProduct = (value: ProductType) =>
  ({ type: 'SET_PRODUCT', value } as const);
export const setAttributes = (attribute: AttributeSet, productId: string) =>
  ({ type: 'SET_ATTRIBUTES', attribute, productId } as const);
export const setCurrency = (currency: string) =>
  ({ type: 'SET_CURRENCY', currency } as const);
export const setProductToCart = (product: ProductCartType) =>
  ({ type: 'SET_PRODUCT_TO_CART', product } as const);
export const setIncProductCount = (id: string) =>
  ({ type: 'SET_INC_PRODUCT_COUNT', id } as const);
export const setDecProductCount = (id: string) =>
  ({ type: 'SET_DEC_PRODUCT_COUNT', id } as const);
export const setProductCount = (count: number) =>
  ({ type: 'SET_PRODUCT_COUNT', count } as const);
export const clearCart = () => ({ type: 'CLEAR_CART' } as const);

export const clearAttributes = () => ({ type: 'CLEAR_ATTRIBUTES' } as const);
export const setTotalSum = () => ({ type: 'SET_TOTAL_SUM' } as const);
export const removeProductFromCart = (productId: string) =>
  ({ type: 'REMOVE_PRODUCT_FROM_CART', productId } as const);

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
    }
  };
export const changeCurrencies =
  (currency: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setCurrency(currency));
  };
export const addAttributes =
  (attribute: AttributeSet, productId: string) => (dispatch: Dispatch<ActionsType>) => {
    // eslint-disable-next-line no-debugger
    debugger;
    dispatch(setAttributes(attribute, productId));
  };
export const addProductCart =
  (newProduct: ProductCartType) => (dispatch: Dispatch<ActionsType>) => {
    // eslint-disable-next-line no-debugger
    debugger;
    dispatch(setProductToCart(newProduct));
    // dispatch(setDefaultAttributes(attribute));
  };
export const incProduct = (id: string) => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setIncProductCount(id));
};
export const decProduct = (id: string) => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setDecProductCount(id));
};
export const getProductCount = (count: number) => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setProductCount(count));
};
export const getTotalSum = () => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setTotalSum());
};
type ActionsType =
  | ReturnType<typeof setProduct>
  | ReturnType<typeof initializedSuccess>
  | ReturnType<typeof setAllProducts>
  | ReturnType<typeof setAttributes>
  | ReturnType<typeof setCurrency>
  | ReturnType<typeof setProductToCart>
  | ReturnType<typeof clearCart>
  | ReturnType<typeof setIncProductCount>
  | ReturnType<typeof setDecProductCount>
  | ReturnType<typeof setProductCount>
  | ReturnType<typeof clearAttributes>
  | ReturnType<typeof setTotalSum>
  | ReturnType<typeof removeProductFromCart>;
