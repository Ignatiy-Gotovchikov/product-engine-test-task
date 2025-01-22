import React, { forwardRef } from 'react';
import styles from './Input.module.scss';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, errorMessage, ...rest }, ref) => {
    const inputClassName = errorMessage
      ? `${styles.input} ${styles.error}`
      : styles.input;

    return (
      <div className={styles.wrapper}>
        {label && <label className={styles.label}>{label}</label>}
        <input ref={ref} className={inputClassName} {...rest} />
        {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
      </div>
    );
  }
);

Input.displayName = 'Input';
