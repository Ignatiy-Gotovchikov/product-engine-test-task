import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { authReducer } from '../../../features/auth/model/slice';
import { accountApi } from '../../../features/account/model/accountApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
		[accountApi.reducerPath]: accountApi.reducer
  },
	middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(accountApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
