import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';

import rafflesReducer from './raffles/reducer';
import settingsReducer from './settings/reducer';
import usersReducer from './users/reducer';
import withdrawsReducer from './withdraws/reducer';

const middlewares = [thunk];

const reducers = combineReducers({
  raffles: rafflesReducer,
  settings: settingsReducer,
  users: usersReducer,
  withdraws: withdrawsReducer,
});

export type RootStore = ReturnType<typeof reducers>;

export default createStore(reducers, composeWithDevTools(applyMiddleware(...middlewares)));
