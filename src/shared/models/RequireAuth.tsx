import { useLocation, Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const location = useLocation();
  
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
