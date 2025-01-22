import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLazyGetAccountByIdQuery } from '../../../features/account/model/accountApi';
import EditAccountForm from '../../../features/account/ui/EditAccountForm';
import styles from './AccountPage.module.scss';

interface FormFields {
  userId: number;
}

export default function AccountPage () {
  const [trigger, { 
		data, 
		isLoading, 
		isError 
	}] = useLazyGetAccountByIdQuery();
  
  const [editMode, setEditMode] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormFields>();

  const onSubmit = (formData: FormFields) => {
    trigger(formData.userId);
    setEditMode(false);
  };

  const handleSuccessUpdate = (newEmail: string) => {
    if (data) {
      const updatedData = { ...data, email: newEmail };
      Object.assign(data, updatedData);
    }
  };

  const renderDataList = (accountData: typeof data) => {
    const fields = [
      { key: 'id', label: 'ID', value: accountData.id },
      { key: 'email', label: 'Email', value: accountData.email },
      { key: 'firstName', label: 'First Name', value: accountData.first_name },
      { key: 'lastName', label: 'Last Name', value: accountData.last_name },
    ];

    return (
      <ul>
        {fields.map((field) => (
          <li key={field.key}>
            <b>{field.label}:</b> {field.value}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className={styles.container}>
      <h1>Account Page</h1>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.fieldGroup}>
					<label htmlFor="userId">User ID:</label>
					<input
						id="userId"
						type="number"
						{...register('userId', {
							required: 'User ID is required',
							valueAsNumber: true,
							min: {
								value: 1,
								message: 'ID must be >= 1'
							}
						})}
					/>
					{errors.userId && (
						<div className={styles.errorMessage}>{errors.userId.message}</div>
					)}
				</div>

				<button className={styles.searchButton} type="submit">
					Search
				</button>
			</form>	


      <div className={styles.resultContainer}>
        {isLoading && <p>Loading...</p>}
        {isError && <p>No data found (or error occurred)</p>}
        {!isLoading && !isError && data === null && <p>No data found</p>}

        {!isLoading && data && (
          <div>
						 {renderDataList(data)}

            <button onClick={() => setEditMode(!editMode)}>
              {editMode ? 'Close Edit Form' : 'Edit'}
            </button>

            {editMode && (
              <EditAccountForm
                userId={data.id}
                currentEmail={data.email}
                onSuccessUpdate={handleSuccessUpdate}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
