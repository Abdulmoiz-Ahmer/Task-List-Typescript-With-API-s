import React from 'react';
// import styles from './CustomInput.module.css';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Center
} from "@chakra-ui/react";

export const CustomInput: React.FC<customInputProps> = ({ label, type, name, register, error = '' }: customInputProps) => {
    return (
        <FormControl id={name} mt={5} isInvalid={error != ''}>
            <FormLabel>{label}</FormLabel>
            <Input type={type} name={name} ref={register} />
            <Center>
                <FormErrorMessage>{error}</FormErrorMessage>
            </Center>
        </FormControl>
    );
}