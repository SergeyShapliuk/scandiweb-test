import { Dispatch } from 'redux';

import {
  ActionsType,
  initializedSuccess,
  setProduct,
  setProductsCategory,
} from './actionCreators';

import { client } from 'graphql/AppoloClient';
import { AttributeSet, ProductCartType, ProductType, Category } from 'graphql/graphql';
import { getProduct, getProductCategory } from 'graphql/query/queries';

const initialState = {
  initialized: false,
  productCategory: {} as Category,
  productPage: {} as ProductType,
  attributeSet: [] as AttributeSet[],
  productCart: [] as ProductCartType[],
  currency: '$' as string,
  productsCount: 0,
  totalSum: 0,
  showModals: false,
};
type InitialStateType = typeof initialState;

export const mainReducer = (
  state = initialState,
  action: ActionsType,
): InitialStateType => {
  switch (action.type) {
    case 'INITIALIZED_SUCCESS':
      return { ...state, initialized: action.value };
    case 'SET_PRODUCTS_CATEGORY':
      return { ...state, productCategory: action.value };
    case 'SET_PRODUCT': {
      return { ...state, productPage: action.value };
    }
    case 'SET_ATTRIBUTES': {
      const itemId = action.attribute.items?.map(m => m?.id);
      if (
        state.attributeSet
          .find(f => f.id === action.attribute.id)
          ?.items?.find(fe => fe?.id === itemId)
      ) {
        return {
          ...state,
          attributeSet: state.attributeSet.map(val =>
            val.id === action.attribute.id ? action.attribute : val,
          ),
        };
      }
      return {
        ...state,
        attributeSet: [action.attribute, ...state.attributeSet],
      };
    }
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
      return { ...state, attributeSet: [] };
    case 'REMOVE_PRODUCT_FROM_CART':
      return {
        ...state,
        productCart: state.productCart.filter(f => f.id !== action.productId),
      };
    case 'SET_SHOW_MODAL':
      return { ...state, showModals: action.showModal };
    default:
      return state;
  }
};

export const getProductsCategory =
  (categoryName: string) => async (dispatch: Dispatch<ActionsType>) => {
    const data = await client.query({
      query: getProductCategory(categoryName),
    });
    if (!data.loading) {
      dispatch(setProductsCategory(data.data.category));
      dispatch(initializedSuccess(true));
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
