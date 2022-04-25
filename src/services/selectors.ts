import { RootStateType } from '../store/rootStore/rootReducer';

export const getProduct = (state: RootStateType) => state.main.productPage;
