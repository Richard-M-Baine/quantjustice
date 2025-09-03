import { combineReducers } from 'redux';

import { configureStore } from '@reduxjs/toolkit';

import county from './county';
import misconduct from './misconduct'
import judge from './judge'


const rootReducer = combineReducers({
  county,
  misconduct,
  judge,
});

const store = configureStore({
  reducer: rootReducer,

});

export default store;
