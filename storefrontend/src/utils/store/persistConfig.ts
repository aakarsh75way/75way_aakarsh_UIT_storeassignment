import localforage from "localforage";
import { authSliceKey } from "../../app/containers/Auth/redux/slice";
import { persistReducer } from "redux-persist";
import { rootReducer } from "./combineReducers";

const persistConfig = {
    key: 'root', 
    storage: localforage, 
    whitelist: [authSliceKey], 
  };
  export const persistedReducer = persistReducer(persistConfig, rootReducer);