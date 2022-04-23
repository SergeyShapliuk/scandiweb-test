import { Dispatch } from 'redux';

import { client } from '../../components/AppoloClient';
import { CategoryProductQuery } from '../../generated/graphql';
import { getProductCategories } from '../../graphql/queries';

const initialState = {
  initialized: false,
  pathName: [] as string[] | null,
  allProducts: {} as CategoryProductQuery,
};

type InitialStateType = typeof initialState;

export const mainReducer = (
  // eslint-disable-next-line default-param-last
  state = initialState,
  action: ActionsType,
): InitialStateType => {
  switch (action.type) {
    case 'INITIALIZED_SUCCESS':
      return { ...state, initialized: true };
    case 'SET_PATHNAME':
      return { ...state, pathName: action.value };
    case 'SET_PRODUCTS':
      return { ...state, allProducts: action.value };
    default:
      return state;
  }
};

export const addPathName = (value: string[] | null) =>
  ({ type: 'SET_PATHNAME', value } as const);
export const initializedSuccess = () => ({ type: 'INITIALIZED_SUCCESS' } as const);
export const getAllProducts = (value: any) => ({ type: 'SET_PRODUCTS', value } as const);

export const initializeApp = () => async (dispatch: Dispatch<ActionsType>) => {
  const data = await client.query({
    query: getProductCategories,
  });
  if (!data.loading) {
    dispatch(getAllProducts(data));
    dispatch(initializedSuccess());
  }
};

type ActionsType =
  | ReturnType<typeof addPathName>
  | ReturnType<typeof initializedSuccess>
  | ReturnType<typeof getAllProducts>;
