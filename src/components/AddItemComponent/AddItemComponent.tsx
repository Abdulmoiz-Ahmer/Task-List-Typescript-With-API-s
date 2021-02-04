import React, { useState } from 'react';
import { CustomTextArea } from '../Elements/CustomTextArea';
import { CustomButton } from '../Elements/CustomButton';
import styles from './AddItemComponent.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios';

type login = {
    description: string,
}

const schema = yup.object().shape({
    description: yup.string().required(),
});


export const AddItemComponent = (props: { addTask: (task: Task) => void }) => {

    const [disableButton, setDisableButton] = useState(false);

    const { register, handleSubmit, errors, setValue } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: login) => {
        setDisableButton(true);
        axios.post(`${process.env.REACT_APP_BASE_URL}/task`, {
            ...data
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('userTaskToken')}`
            }
        }).then((response) => {
            console.log(response);
            if (response.status == 201) {
                props.addTask(response.data.data);
            } else if (response.status === 400) {
                console.log("something went wrong");
            }



        }).catch(error => {
            console.log(error);
            console.log("something went wrong");
        }).finally(() => {
            setValue('description', '');
            setDisableButton(false);
        })

    }

    return (
        <form className={styles.bgColor} onSubmit={handleSubmit(onSubmit)}>
            <CustomTextArea
                label='Description'
                name='description'
                type='text'
                register={register}
                error={errors && errors.description && errors.description.message ? errors.description.message : ''}
            />

            <CustomButton
                label='+'
                type='submit'
                classNamee={styles.itemTwo}
                disableButton={disableButton}
            />
        </form>
    );
}
