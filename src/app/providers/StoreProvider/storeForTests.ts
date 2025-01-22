import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../../../features/auth/model/slice';
import { accountApi } from '../../../features/account/model/accountApi';

export function setupStore() {
  return configureStore({
    reducer: {
      auth: authReducer,
      [accountApi.reducerPath]: accountApi.reducer
    },
    middleware: (gDM) => gDM().concat(accountApi.middleware)
  });
}
