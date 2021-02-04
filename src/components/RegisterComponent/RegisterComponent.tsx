import React from 'react';
import { CustomInput } from '../Elements/CustomInput';
import { CustomButton } from '../Elements/CustomButton';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

type register = {
    name: string,
    age: number
    email: string,
    password: string
}

type res = {
    data: {
        data: register
        token: string
    }
    status: number
}

const schema = yup.object().shape({
    name: yup.string().required(),
    age: yup.number().min(0.1).required(),
    email: yup.string().email().required(),
    password: yup.string().required().test('len', 'Password must be at least 8 alphanumeric characters and symbols', val => val ? val.toString().length >= 8 : false),
});

export const RegisterComponent = () => {

    const history = useHistory();
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: register) => {

        axios.post(`${process.env.REACT_APP_BASE_URL}/user/register`, {
            ...data
        }).then((response: res) => {
            // console.log(response);
            if (response.status == 201) {
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <CustomInput
                label='Name'
                name='name'
                type='text'
                register={register}
                error={errors && errors.name && errors.name.message ? errors.name.message : ''}
            />

            <CustomInput
                label='Age'
                name='age'
                type='number'
                register={register}
                error={errors && errors.age && errors.age.message ? errors.age.message : ''}
            />

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
                label='Register'
                type='submit'
                classNamee=''
            />
        </form>
    );
}
