import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateAccountMutation } from '../model/accountApi';
import styles from './EditAccountForm.module.scss';

interface EditAccountFormProps {
  userId: number;
  currentEmail: string; 
  onSuccessUpdate: (newEmail: string) => void; 
}

interface FormData {
  email: string;
}

export default function EditAccountForm ({
  userId,
  currentEmail,
  onSuccessUpdate
}: EditAccountFormProps) {
  const [updateAccount, { 
		isLoading, 
		isSuccess, 
		isError 
	}] = useUpdateAccountMutation();

  const [successMessage, setSuccessMessage] = useState('');
  const [sameEmailError, setSameEmailError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      email: currentEmail
    }
  });

  const onSubmit = async (formData: FormData) => {
    setSameEmailError('');
    setSuccessMessage('');

    if (formData.email.trim().toLowerCase() === currentEmail.trim().toLowerCase()) {
      setSameEmailError('Field is not updated (same email)');
      return;
    }

    try {
      const result = await updateAccount({ id: userId, email: formData.email }).unwrap();
      setSuccessMessage(`Successfully updated email to "${result.email}" on ${result.updatedAt}`);
      onSuccessUpdate(result.email);
    } catch (error) {
      console.error('Error updating account:', error);
    }
  };

  useEffect(() => {
    setSuccessMessage('');
    setSameEmailError('');
  }, [userId]);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.fieldGroup}>
        <label htmlFor='email'>Email</label>
        <input
					id="email"
          type="text"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email format'
            }
          })}
        />
        {errors.email && (
          <div className={styles.errorMessage}>
            {errors.email.message}
          </div>
        )}
        {sameEmailError && (
          <div className={styles.errorMessage}>
            {sameEmailError}
          </div>
        )}
      </div>

      <button className={styles.submitButton} type="submit" disabled={isLoading}>
        {isLoading ? 'Updating...' : 'Submit'}
      </button>

      {isSuccess && successMessage && (
        <div className={styles.successMessage}>{successMessage}</div>
      )}

      {isError && (
        <div className={styles.errorMessage}>
          Something went wrong. Please try again.
        </div>
      )}
    </form>
  );
};
