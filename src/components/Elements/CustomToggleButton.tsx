import React from 'react';
import styles from './CustomToggleButton.module.css';


interface customButtonProps {
    type: "button" | "submit" | "reset",
    label: string,
    click:()=>void
}

export const CustomToggleButton = ({ label, type,click }: customButtonProps) => {
    return (
        <button type={type} onClick={click} className={styles.btn}>
            {label}
        </button>
    );
}