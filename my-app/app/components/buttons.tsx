import React from 'react';
import { CustomCancelBtn, CustomFilledBtn } from './mui/buttons';

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
            <CustomFilledBtn className='bg-main-navy' variant='contained' disabled={disabled} onClick={onClick}>
                <div className='flex leading-4'>{rightBtnText}</div>
            </CustomFilledBtn>
        </div>
    );
};
export default Buttons;
