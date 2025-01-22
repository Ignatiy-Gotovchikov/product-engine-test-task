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
  <Route 
    element={
      <RequireAuth>
        <Layout />
      </RequireAuth>
    }
  >
    <Route path="/home" element={<div>Home Page</div>} />
    <Route path="/activation" element={<div>Activation Page</div>} />
    <Route path="/account" element={<AccountPage />} />

    <Route path="*" element={<LoginPage />} />
  </Route>
</Routes>
  );
}
