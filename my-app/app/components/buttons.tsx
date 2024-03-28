import React from 'react';
import { Button, styled, ButtonProps } from '@mui/material';

const CustomCancelBtn = styled(Button)<ButtonProps>(() => ({
    width: '96px',
    borderRadius: '0.375rem',
    color: '#374151',
    backgroundColor: 'white',
    border: '1px solid #d1d5db',
    padding: '10px 0',
    ':hover': {
        backgroundColor: '#f3f4f6',
        borderColor: '#d1d5db',
    },
}));

const CustomFilledBtn = styled(Button)<ButtonProps>(() => ({
    width: '96px',
    marginLeft: '8px',
    padding: '10px 0',
    backgroundColor: '#0d1c4b',
    color: 'white',
    borderRadius: '0.375rem',
    ':hover': {
        backgroundColor: '#122e87',
    },
}));

interface ButtonsProps {
    leftBtnText: string;
    rightBtnText: string;
    onClose: () => void;
    onClick: (value: any) => void;
    disabled?: boolean;
}

const Buttons = ({ leftBtnText, rightBtnText, onClose, onClick, disabled }: ButtonsProps) => {
    return (
        <div className='flex justify-end bg-gray-50 border-t-2 border-gray-100 p-5 text-sm'>
            <CustomCancelBtn variant='outlined' onClick={onClose}>
                <div className='flex leading-4'>{leftBtnText}</div>
            </CustomCancelBtn>
            <CustomFilledBtn variant='contained' disabled={disabled} onClick={onClick}>
                <div className='flex leading-4'>{rightBtnText}</div>
            </CustomFilledBtn>
        </div>
    );
};
export default Buttons;
