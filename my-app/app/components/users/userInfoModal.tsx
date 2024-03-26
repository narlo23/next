'use client';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid';
import DialogHeader from '@/app/components/users/dialog/dialogHeader';

const UserInfoModal = ({
    userInfo,
    open,
    onClose,
    onClick,
}: {
    userInfo: any;
    open: boolean;
    onClose: () => void;
    onClick: () => void;
}) => {
    const [openModal, setOpenModal] = useState(false);

    const ref = useRef<any>();

    useEffect(() => {
        const handleClickOutside = (e: any) => {
            if (openModal && (!ref.current || !ref.current.contains(e.target))) {
                setOpenModal(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openModal]);

    return (
        <div className='w-full h-full flex items-center'>
            <Dialog open={open} maxWidth='lg'>
                <DialogHeader title='사용자 정보' onClose={onClose} />
                <DialogContent className='p-0'>
                    <div className='overflow-y-auto max-h-[610px] px-[1.5rem] pt-[1.5rem] pb-[2.5rem]'>
                        <div className='flex gap-7'>
                            <div>
                                <div className='w-32 h-32'>
                                    <img
                                        src='https://dev-api.jmember.co.kr/image/my_default.png'
                                        alt='user'
                                        width={128}
                                        height={128}
                                    />
                                </div>
                                <div className='flex mt-3'>
                                    <div className='flex items-center justify-center w-20 py-1 border border-gray-200 rounded-l-lg'>
                                        <div className='w-2 h-2 mr-1 rounded-full bg-secondary'></div>
                                        <p className='text-xs text-secondary'>재직</p>
                                    </div>
                                    <div className='flex items-center px-2 border border-l-0 border-gray-200 rounded-r-lg relative'>
                                        <EllipsisHorizontalIcon
                                            width={24}
                                            height={24}
                                            className='text-gray-400 p-1 cursor-pointer relative'
                                            onMouseDown={(e: any) => {
                                                e.stopPropagation();
                                                setOpenModal(!openModal);
                                            }}
                                        />
                                        {openModal && (
                                            <div
                                                className='absolute z-40 w-32 py-1 bg-white rounded-md shadow-lg top-5 left-7'
                                                ref={ref}
                                            >
                                                <p className='block py-2 px-4 text-sm text-gray-700 cursor-pointer text-center hover:bg-gray-100'>
                                                    퇴직 처리
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-3 mt-1'>
                                {userInfo.columns.map((column: any) => {
                                    return (
                                        <div key={column.field} className='break-all'>
                                            <div className='mb-1 text-xs text-gray-400'>{column.headerName}</div>
                                            <div className='text-xs text-gray-800'>{userInfo.row[column.field]}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <div className='flex justify-end bg-gray-50 border-t-2 border-gray-100 p-5 text-sm'>
                    <Button
                        variant='outlined'
                        className='w-24 rounded-md text-[#374151] bg-white border-1 border-gray-300 hover:bg-gray-100 hover:border-gray-300 py-[10px] leading-4'
                        onClick={onClose}
                    >
                        취소
                    </Button>
                    <Button
                        variant='contained'
                        className='w-24 rounded-md bg-main-navy text-white hover:bg-secondary ml-2 py-[10px] leading-4'
                        onClick={onClick}
                    >
                        수정
                    </Button>
                </div>
            </Dialog>
        </div>
    );
};

export default UserInfoModal;
