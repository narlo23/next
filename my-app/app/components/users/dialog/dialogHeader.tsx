import React from 'react';
import { DialogTitle } from '@mui/material';

const DialogHeader = ({ title, onClose }: { title: string; onClose: () => void }) => {
    return (
        <>
            <DialogTitle sx={{ padding: 0 }}>
                <div className='flex items-center justify-between border-b-2 border-gray-100 py-4 pl-5 pr-6 w-[512px]'>
                    <p className='font-bold text-lg'>{title}</p>
                    <div className='w-5 h-5 text-gray-400 cursor-pointer' onClick={onClose}>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='2'
                            stroke='currentColor'
                            aria-hidden='true'
                            className='dialog-header-close-icon'
                        >
                            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12'></path>
                        </svg>
                    </div>
                </div>
            </DialogTitle>
        </>
    );
};
export default DialogHeader;
