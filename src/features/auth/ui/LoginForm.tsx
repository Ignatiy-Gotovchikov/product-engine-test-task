import { useForm } from 'react-hook-form';
import { 
	useAppDispatch, 
	useAppSelector 
} from '../../../app/providers/StoreProvider/store';
import { login, selectAuthError } from '../model/slice';
import { Input } from '../../../shared/ui/Input';
import styles from './LoginForm.module.scss';

interface LoginFormFields {
  username: string;
  password: string;
}

export default function LoginForm () {
  const dispatch = useAppDispatch();
  const authError = useAppSelector(selectAuthError);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormFields>({
    defaultValues: {
      username: '',
      password: ''
    }
  });

  const onSubmit = (data: LoginFormFields) => {
    dispatch(login(data));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.heading}>Login</h2>

      <Input
        label="Username"
        errorMessage={errors.username?.message}
        {...register('username', {
          required: 'Username is required'
        })}
      />

      <Input
        label="Password"
        type="password"
        errorMessage={errors.password?.message}
        {...register('password', {
          required: 'Password is required'
        })}
      />

      {authError && <div className={styles.errorMessageRedux}>{authError}</div>}

      <button className={styles.submitButton} type="submit">
        Log In
      </button>
    </form>
  );
};
