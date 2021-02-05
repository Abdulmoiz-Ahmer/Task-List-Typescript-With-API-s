import React, { useContext, useState } from 'react';
import { CustomInput } from '../Elements/CustomInput';
import { CustomButton } from '../Elements/CustomButton';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../Contexts/UserContext';
import { Center } from '@chakra-ui/react';

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
        user: register & login,
        token: string
    }
    status: number
}

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});

export const LoginComponent: React.FC = () => {

    const history = useHistory();
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const { setUserState } = useContext(UserContext);
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: login) => {
        setIsButtonLoading(!isButtonLoading);
        axios.post(`${process.env.REACT_APP_BASE_URL}/user/login`, {
            ...data
        }).then((response: res) => {
            if (response.status === 200) {
                setUserState(response.data.user);
                localStorage.setItem('userTaskToken', response.data.token);
                localStorage.setItem('userData', JSON.stringify(response.data.user));
                history.push('/tasks');
            } else if (response.status === 400) {
                console.log("something went wrong");
            }

        }).catch(error => {
            console.log(error);
            console.log("something went wrong");
        }).finally(() => {
            setIsButtonLoading(!isButtonLoading);
        })

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <Center>
                <CustomButton
                    label='Login'
                    type='submit'
                    isLoading={isButtonLoading}
                />
            </Center>

        </form>
    );
}
