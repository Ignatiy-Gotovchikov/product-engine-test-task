import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch } from './providers/StoreProvider/store';
import { loadSession } from '../features/auth/model/slice';
import LoginPage from '../pages/LoginPage/ui/LoginPage';
import RequireAuth from '../shared/models/RequireAuth';
import AccountPage from '../pages/AccountPage/ui/AccountPage';

import { Layout } from '../widgets/Layout';

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadSession());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<Layout />}>
        <Route
          path="/home"
          element={
            <RequireAuth>
              <div>Welcome to the Home Page</div>
            </RequireAuth>
          }
        />
        <Route
          path="/activation"
          element={
            <RequireAuth>
              <div>Activation Page</div>
            </RequireAuth>
          }
        />
        <Route
          path="/account"
          element={
            <RequireAuth>
              <AccountPage />
            </RequireAuth>
          }
        />

        <Route path="*" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}
