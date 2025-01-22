import { useEffect } from 'react';
import { 
	useAppSelector, 
	useAppDispatch 
} from '../../../app/providers/StoreProvider/store';
import { 
	selectIsAuthenticated, 
	loadSession 
} from '../../../features/auth/model/slice';
import LoginForm from '../../../features/auth/ui/LoginForm';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.scss';

export default function LoginPage () {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    dispatch(loadSession());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
};
