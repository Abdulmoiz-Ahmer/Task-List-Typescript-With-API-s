import React from 'react';
import { Button, Center } from "@chakra-ui/react";

interface customButtonProps {
    _id?: string,
    type: "button" | "submit" | "reset",
    label: string,
    color?: string,
    disableButton?: boolean
    click?: () => void,
    isLoading?: boolean
}
export const CustomButton: React.FC<customButtonProps> = ({ label, type, color = '', disableButton = false, click, isLoading = false }: customButtonProps) => {
    return (
        <div>
            {color !== '' && <Button mt={5} type={type} disabled={disableButton} onClick={click} isLoading={isLoading} colorScheme={color}>{label}</Button>}
            {color === '' && <Button mt={5} type={type} disabled={disableButton} onClick={click} isLoading={isLoading} >{label}</Button>}
        </div>
    );
}