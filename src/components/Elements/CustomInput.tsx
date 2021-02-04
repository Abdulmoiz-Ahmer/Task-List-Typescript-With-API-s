import React from 'react';
import styles from './CustomInput.module.css';

export const CustomInput = ({ label, type, name, register, error = '' }: customInputProps) => {
    return (
        <div>
            <label className={styles.label}>{label}</label>
            <input className={styles.input} type={type} name={name} ref={register} />
            <div className={styles.error}>{error}</div>
        </div>
    );
}