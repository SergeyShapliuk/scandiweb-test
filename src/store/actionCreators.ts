import {
  AttributeSet,
  CategoryProductQuery,
  ProductCartType,
  ProductType,
} from '../generated/graphql';

export const initializedSuccess = () => ({ type: 'INITIALIZED_SUCCESS' } as const);
export const setAllProducts = (value: CategoryProductQuery) =>
  ({ type: 'SET_ALL_PRODUCTS', value } as const);
export const setProduct = (value: ProductType) =>
  ({ type: 'SET_PRODUCT', value } as const);
export const setAttributes = (attribute: AttributeSet) =>
  ({ type: 'SET_ATTRIBUTES', attribute } as const);
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

export type ActionsType =
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
