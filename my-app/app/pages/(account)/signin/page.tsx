'use client';

import React, { useRef, useState } from 'react';
import { IconButton, InputLabel, styled, InputLabelProps, ButtonProps } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { Button } from '@mui/material';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';
import { LogoIcon } from '@/app/components/icons';
import SignInIcon from '@/app/components/icons/signin';
import Link from 'next/link';

const CustomInputLabel = styled(InputLabel)<InputLabelProps>(() => ({
    marginBottom: '4px',
    display: 'flex',
    textAlign: 'left',
    fontSize: '12px',
    lineHeight: '1.5rem',
    color: '#111827',
}));

const CustomLoginBtn = styled(Button)<ButtonProps>(() => ({
    width: '100%',
    backgroundColor: '#0d1c4b',
    padding: '10px 15px',
    borderRadius: '0.375rem',
    fontSize: '1rem',
    ':hover': {
        backgroundColor: '#243d8d',
    },
}));

const Login = () => {
    const idRef = useRef<any>(null);
    const pwRef = useRef<any>(null);
    const [errorText, setErrorText] = useState(['', '']);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleLoginClick = () => {
        if (idRef.current && pwRef.current) {
            const currentId = idRef.current.value;
            const currentPw = pwRef.current.value;

            if (currentId !== '' && currentPw !== '') {
                // 대시보드로 이동
                localStorage.setItem('login', 'test');
                router.push('/pages/dashboard');
            }

            let newErrorText = [...errorText];
            if (currentId === '') {
                newErrorText[0] = '아이디를 입력하세요';
            } else {
                newErrorText[0] = '';
            }
            if (currentPw === '') {
                newErrorText[1] = '비밀번호를 입력하세요';
            } else {
                newErrorText[1] = '';
            }
            setErrorText(newErrorText);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center flex-1 py-12 sm:px-6 lg:px-8 w-[920px] m-auto'>
            <div className='pl-2 mb-4 w-full'>
                <LogoIcon props='w-[192px]' />
            </div>
            <div className='h-[500px] flex flex-row rounded-3xl shadow-md'>
                <div className='w-[472px] h-full rounded-l-3xl px-16 py-12 bg-white'>
                    <form>
                        <div className='text-main-navy mt-2 w-full text-primary font-bold text-lg'>로그인</div>
                        <div className='mt-5 text-xs'>
                            <CustomInputLabel htmlFor='idInput' className='text-gray-900'>
                                아이디
                            </CustomInputLabel>
                            <input
                                id='idInput'
                                type='text'
                                ref={idRef}
                                placeholder='아이디'
                                autoComplete='off'
                                className={`block w-full rounded-md border-0 py-2.5 text-gray-500 ring-1 ring-inset placeholder:text-gray-300 focus:ring-1 focus:ring-inset focus:ring-main-navy text-xs leading-4
                            ${errorText[0] !== '' ? 'ring-error' : 'ring-gray-300'}`}
                            />
                            {errorText && errorText[0] !== '' && (
                                <div className='h-5 text-xs text-error flex items-center' id='email-error'>
                                    <ExclamationCircleIcon className='h-4 w-4 text-error mr-1' aria-hidden='true' />
                                    {errorText[0]}
                                </div>
                            )}
                        </div>
                        <div className='mt-4 text-xs'>
                            <CustomInputLabel htmlFor='pwInput'>비밀번호</CustomInputLabel>
                            <div className='relative'>
                                <input
                                    id='pwInput'
                                    ref={pwRef}
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='비밀번호'
                                    autoComplete='off'
                                    className={`block w-full rounded-md border-0 py-2.5 text-gray-500 ring-1 ring-inset placeholder:text-gray-300 focus:ring-1 focus:ring-inset focus:ring-main-navy text-xs leading-4 ${
                                        errorText[1] !== '' ? 'ring-error' : 'ring-gray-300'
                                    }`}
                                />
                                <div className='cursor-pointer absolute top-0 right-0'>
                                    <IconButton
                                        aria-label='toggle password visibility'
                                        sx={{
                                            color: '#d1d5db',
                                        }}
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </div>
                                {errorText && errorText[1] !== '' && (
                                    <div className='text-xs text-error flex' id='email-error'>
                                        <ExclamationCircleIcon className='h-4 w-4 text-error mr-1' aria-hidden='true' />
                                        {errorText[1]}
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>

                    <div className='flex items-center justify-end mt-3'>
                        <p className='text-sm text-main-navy underline cursor-pointer'>비밀번호 찾기</p>
                    </div>
                    <div className='mt-4'>
                        <CustomLoginBtn
                            className='bg-main-navy'
                            type='button'
                            variant='contained'
                            onClick={handleLoginClick}
                        >
                            <div className='flex text-sm leading-4'>로그인</div>
                        </CustomLoginBtn>
                    </div>
                    <div className='mt-4 flex justify-center'>
                        <p className='text-gray-600 text-sm'>아직 오피스넥스트 회원이 아니세요?</p>
                    </div>
                    <div className='flex items-center justify-center mt-1'>
                        <Link href='join/check'>
                            <div className='border-b cursor-pointer text-[#0d1d4b] border-[#0d1d4b] text-sm'>
                                {'회원가입하기 >'}
                            </div>
                        </Link>
                    </div>
                </div>
                <div className='w-[388px] h-full rounded-r-3xl bg-main-navy'>
                    <SignInIcon />
                </div>
            </div>
            <div className='flex justify-between w-full p-3 mt-4'>
                <div className='text-xs text-center text-gray-400'>Copyright 2024©JIRANSOFT All rights reserved.</div>
                <div className='flex space-x-4'>
                    <p className='text-xs text-gray-500 underline cursor-pointer'>개인정보처리방침</p>
                    <p className='text-xs text-gray-500 underline cursor-pointer'>이용약관</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
