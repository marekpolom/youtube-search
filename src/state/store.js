import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';

import logger from 'redux-logger';

import { createMiddleware } from 'redux-api-middleware';
import youtubeReducers from "./ducks/youtube/reducers";
import userReducers from "./ducks/user/reducers";
import dataReducers from "./ducks/data/reducers";

const rootReducer = combineReducers({...youtubeReducers, ...userReducers, ...dataReducers});
const store = createStore(rootReducer, applyMiddleware(thunk, createMiddleware(), logger));

export default store;