import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import {thunk} from 'redux-thunk'; // Correct import for thunk
import { authReducer as AuthReducer,  } from "./Auth/reducer"

import { taskReducer as TaskReducer } from "./Task/reducer"

const rootReducer = combineReducers({
  AuthReducer,
  TaskReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
