import React from 'react';
import styles from './CustomButton.module.css';


interface customButtonProps {
    _id?: string,
    type: "button" | "submit" | "reset",
    label: string,
    classNamee: string,
    disableButton?: boolean
    click?: () => void
}
export const CustomButton = ({ label, type, classNamee = '', disableButton = false, click }: customButtonProps) => {
    return (
        <button type={type} className={`${styles.btn} ${classNamee != '' && classNamee}`} disabled={disableButton} onClick={click}>
            {label}
        </button>
    );
}