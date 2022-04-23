import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { mainReducer } from '../mainReducer/mainReducer';

const rootReducer = combineReducers({
  main: mainReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootStateType = ReturnType<typeof rootReducer>;

// @ts-ignore
window.store = store;
