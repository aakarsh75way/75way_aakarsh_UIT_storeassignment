// Assuming you have an auth slice
import { reducer as authReducer, authSliceKey } from '../../app/containers/Auth/redux/slice';
import { combineReducers } from '@reduxjs/toolkit';
export const rootReducer = combineReducers({
  [authSliceKey]: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
