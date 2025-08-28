import { combineReducers } from 'redux';

import { configureStore } from '@reduxjs/toolkit';

import county from './county';


const rootReducer = combineReducers({
  county
});

const store = configureStore({
  reducer: rootReducer,

});

export default store;
