import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { api } from '../../app/containers/Auth/rtkquery';

import { reducer as authReducer,authSliceKey } from '../../app/containers/Auth/redux/slice';
import {persistedReducer} from "./persistConfig"
import { persistStore } from 'redux-persist';
const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [authSliceKey]: authReducer,
    persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);
const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
