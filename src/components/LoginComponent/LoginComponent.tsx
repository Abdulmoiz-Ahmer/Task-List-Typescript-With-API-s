import React, { useEffect } from 'react';
import { CustomInput } from '../Elements/CustomInput';
import { CustomButton } from '../Elements/CustomButton';
import styles from './LoginComponent.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useHistory } from 'react-router-dom';
import axios from 'axios';

type login = {
    email: string,
    password: string
}
type register = {
    name: string,
    age: number,
}

type res = {
    data: {
        data: register & login,
        token: string
    }
    status: number
}

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});

export const LoginComponent = () => {

    const history = useHistory();

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema),
    });


    const onSubmit = (data: login) => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/user/login`, {
            ...data
        }).then((response: res) => {
            if (response.status == 200) {
                console.log(response.data);
                console.log(response.data.token);
                localStorage.setItem('userTaskToken', response.data.token);
                history.push('/tasks');
            } else if (response.status === 400) {
                console.log("something went wrong");
            }

        }).catch(error => {
            console.log(error);
            console.log("something went wrong");
        })

    }

    return (
        <form className={styles.bgColor} onSubmit={handleSubmit(onSubmit)}>
            <CustomInput
                label='Email'
                name='email'
                type='text'
                register={register}
                error={errors && errors.email && errors.email.message ? errors.email.message : ''}
            />
            <CustomInput
                label='Password'
                name='password'
                type='password'
                register={register}
                error={errors && errors.password && errors.password.message ? errors.password.message : ''}
            />
            <CustomButton
                label='Login'
                type='submit'
                classNamee=''
            />
        </form>
    );
}
