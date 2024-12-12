/**
 * @author Sagar Bhattacharya
 * @description Utility Button
 */

import React from 'react';
import { Button } from '@mui/material';

type CustomButton = 'primary' | 'secondary' | 'tertiary';

interface IProps {
    buttonType: CustomButton;
    buttonText: string;
    disabled?: boolean;
    handleFunction?: () => void;
}

export const HunarButton: React.FC<IProps> = ({
    buttonType,
    buttonText,
    disabled = false,
    handleFunction,
}) => {
    const getButtonStyle = () => {
        switch (buttonType) {
            case 'primary':
                return {
                    margin: '8px 4px',
                    backgroundColor: '#1976d2',
                    color: '#ffffff',
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: '#115293',
                    },
                    '&.Mui-disabled': {
                        backgroundColor: '#e0e0e0',
                        color: '#9e9e9e',
                        cursor: 'none',
                    },
                };
            case 'secondary':
                return {
                    margin: '8px 4px',
                    color: '#1976d2',
                    backgroundColor: '#ffffff',
                    border: '2px solid #1976d2',
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: '#1976d2',
                        color: '#ffffff',
                    },
                    '&.Mui-disabled': {
                        cursor: 'none',
                        color: '#9e9e9e',
                        borderColor: '#e0e0e0',
                        backgroundColor: '#ffffff',
                    },
                };
            case 'tertiary':
                return {
                    margin: '8px 4px',
                    color: '#1976d2',
                    backgroundColor: '#ffffff',
                    border: 'none',
                    cursor: 'pointer',
                    '&:hover': {
                        color: '#115293',
                    },
                    '&.Mui-disabled': {
                        cursor: 'none',
                        color: '#44444',
                        backgroundColor: '#ffffff',
                    },
                };
            default:
                return {};
        }
    };

    return (
        <Button
            onClick={handleFunction}
            sx={getButtonStyle()}
            disabled={disabled}
        >
            {buttonText}
        </Button>
    );
};
