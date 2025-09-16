import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistReducer, persistStore } from "redux-persist";

import county from "./county";
import misconduct from "./misconduct";
import judge from "./judge";
import total from "./total";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["county"], // only persist this slice
};

const rootReducer = combineReducers({
  county,
  misconduct,
  judge,
  total,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist writes non-serializable values
    }),
});

export const persistor = persistStore(store);
