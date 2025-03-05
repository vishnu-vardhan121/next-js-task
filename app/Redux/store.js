import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterSlice from "./Features/counter/counterSlice";
import usersSlice from "./Features/usersSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import productsSlice from "./Features/productsSlice";
import cartSlice from "./Features/cartSlice";
import likedSlice from "./Features/likedSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  counter: counterSlice,
  user: usersSlice,
  products: productsSlice,
  cart: cartSlice,
  liked: likedSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
