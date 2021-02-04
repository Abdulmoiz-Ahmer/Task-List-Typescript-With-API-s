import React, { useState } from 'react';
import styles from './InitialScreen.module.css';
import { LoginComponent } from '../../components/LoginComponent/LoginComponent';
import { RegisterComponent } from '../../components/RegisterComponent/RegisterComponent';
import { CustomToggleButton } from '../../components/Elements/CustomToggleButton';

export const InitialScreen = () => {
    const [activeComponent, setActiveComponent] = useState('login');
    return (
        <div className={styles.container}>
            <div className={styles.btnContainer}>
                <CustomToggleButton label={'Login'} type={'button'} click={() => {
                    setActiveComponent('login')
                }} />
                <CustomToggleButton label={'Register'} type={'button'} click={() => {
                    setActiveComponent('register')
                }} />
            </div>
            {activeComponent == "login" ? <LoginComponent /> : <RegisterComponent />}
        </div>
    );
}
