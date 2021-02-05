import React from 'react';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Textarea,
    Center
} from "@chakra-ui/react";

export const CustomTextArea: React.FC<customInputProps> = ({ label, type, name, register, error = '', placeholder = '' }: customInputProps) => {
    return (
        <FormControl id={name} mt={5} isInvalid={error !== ''}>
            <FormLabel>{label}</FormLabel>
            <Textarea type={type} name={name} ref={register} size={"lg"} placeholder={placeholder} />
            <Center>
                <FormErrorMessage>{error}</FormErrorMessage>
            </Center>
        </FormControl>
    );
}