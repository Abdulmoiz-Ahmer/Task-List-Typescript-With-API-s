import React from 'react';
import styles from './CustomButton.module.css';
import { Button, Center } from "@chakra-ui/react";

interface customButtonProps {
    _id?: string,
    type: "button" | "submit" | "reset",
    label: string,
    classNamee?: string,
    disableButton?: boolean
    click?: () => void,
    isLoading?: boolean
}
export const CustomButton = ({ label, type, classNamee = '', disableButton = false, click, isLoading = false }: customButtonProps) => {
    return (
        <Center color="white">
            <Button mt={5} type={type} disabled={disableButton} onClick={click} isLoading={isLoading}>{label}</Button>
        </Center>
    );
}