import React from 'react';
import styles from './CustomTextArea.module.css';

export const CustomTextArea = ({ label, type, name, register, error = '' }: customInputProps) => {
    return (
        <div>
            <label className={styles.label}>{label}</label>
            <textarea className={styles.input} name={name} cols={40} rows={5} ref={register}></textarea>
            <div className={styles.error}>{error}</div>
        </div>
    );
}