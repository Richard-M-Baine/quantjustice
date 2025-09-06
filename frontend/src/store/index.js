import { combineReducers } from 'redux';

import { configureStore } from '@reduxjs/toolkit';

import county from './county';
import misconduct from './misconduct'
import judge from './judge'
import total from './total'


const rootReducer = combineReducers({
  county,
  misconduct,
  judge,
  total
});

const store = configureStore({
  reducer: rootReducer,

});

export default store;
