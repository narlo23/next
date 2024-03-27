'use client';

import Header from '@/app/components/header';
import { Button } from '@mui/material';
import React from 'react';

const Logout = () => {
    return (
        <>
            <Header pad='px-8' shadow='md' />
            <div className='flex-1 flex flex-col items-center justify-center text-gray-700'>
                <p className='text-2xl font-semibold text-main-navy'>로그아웃</p>
                <div className='mt-8 text-center text-gray-700'>
                    <span className='font-bold'>오피스넥스트</span>에서 로그아웃 하시겠습니까?
                    <br />
                    오피스넥스트 계정을 사용 중인 다른 서비스에서도 즉시 로그아웃 할 수 있습니다.
                </div>
                <div className='flex items-center px-5 py-2 my-6 space-x-4 bg-white rounded-lg shadow-md w-72'>
                    <div className='w-7 h-9 flex items-center'>
                        <img className='w-7' src='https://dev-api.jmember.co.kr/image/my_default.png' alt='user_icon' />
                    </div>
                    <p className='w-full text-sm text-gray-700 truncate'>nolow75487@sfpixel.com</p>
                </div>
                <div className='flex space-x-4 mb-8'>
                    <Button
                        variant='outlined'
                        size='large'
                        sx={{
                            border: '1px solid rgba(13, 28, 75, 0.5)',
                            color: 'rgb(13, 28, 75)',
                            borderRadius: '0.375rem',
                            fontSize: '1rem',
                            lineHeight: '1rem',
                            padding: '16px 27px',
                            ':hover': {
                                backgroundColor: 'rgba(13, 28, 75, 0.04)',
                                border: '1px solid rgb(13, 28, 75)',
                            },
                        }}
                    >
                        이 서비스만 로그아웃
                    </Button>
                    <Button
                        variant='contained'
                        size='large'
                        sx={{
                            color: 'white',
                            backgroundColor: 'rgb(13, 28, 75) !important',
                            borderRadius: '0.375rem',
                            fontSize: '1rem',
                            lineHeight: '1rem',
                            padding: '16px 27px',
                        }}
                    >
                        오피스넥스트 통합 로그아웃
                    </Button>
                </div>
                <div className='mb-4 text-sm text-center text-secondary'>
                    <strong>오피스넥스트 통합 로그아웃</strong>
                    을 선택하는 경우, 이용 중인 연동 서비스에서도 모두 즉시 로그아웃 처리됩니다. <br /> 안전한 서비스
                    이용을 위해 통합 로그아웃하여 계정을 보호하세요.
                </div>
                <div className='mb-8 text-sm text-center'>
                    <div className='border-b-[1px] text-secondary border-secondary hover:border-b-secondary hover:text-secondary cursor-pointer'>
                        취소하기
                    </div>
                </div>
            </div>
        </>
    );
};

export default Logout;
