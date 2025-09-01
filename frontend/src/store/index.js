import { combineReducers } from 'redux';

import { configureStore } from '@reduxjs/toolkit';

import county from './county';
import misconduct from './misconduct'


const rootReducer = combineReducers({
  county,
  misconduct
});

const store = configureStore({
  reducer: rootReducer,

});

export default store;
