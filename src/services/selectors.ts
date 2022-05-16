import { RootStateType } from '../store/rootStore';

export const getInitialized = (state: RootStateType) => state.main.initialized;
export const getProduct = (state: RootStateType) => state.main.productPage;
export const getProductCart = (state: RootStateType) => state.main.productCart;
export const getAttributeSet = (state: RootStateType) => state.main.attributeSet;
export const getCurrency = (state: RootStateType) => state.main.currency;
export const getProductsCount = (state: RootStateType) => state.main.productsCount;
export const getTotalSum = (state: RootStateType) => state.main.totalSum;
