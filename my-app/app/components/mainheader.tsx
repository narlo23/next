'use client';

import Header from '@/app/components/header';
import { Button } from '@mui/material';
import { QuestionMarkCircleIcon, UserCircleIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export default function MainHeader() {
    const [modal, setModal] = useState<boolean>(false);

    const ref = useRef<any>();

    useEffect(() => {
        const handleClickOutside = (e: any) => {
            if (modal && (!ref.current || !ref.current.contains(e.target))) {
                setModal(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [modal]);

    return (
        <Header pad='px-8'>
            <div className='flex text-black gap-4 items-center'>
                <Link href='https://jiransoft.gitbook.io/manual/' target='_blank'>
                    <Button
                        variant='outlined'
                        className='border-[#d1d5db] hover:border-[#d1d5db] py-2 px-[13px]'
                        startIcon={<QuestionMarkCircleIcon className='text-secondary' width={16} />}
                    >
                        <div className='text-secondary'>사용가이드</div>
                    </Button>
                </Link>
                <div className='w-7 h-7'>
                    <a>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 25 24'
                            strokeWidth='2'
                            stroke='currentColor'
                            aria-hidden='true'
                            className='text-gray-500 cursor-pointer w-7 h-7 hover:text-gray-600 focus:text-secondary disabled:text-gray-300 '
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeMiterlimit='10'
                                d='M5.84 14.73V9.16A6.16 6.16 0 0112 3a6.19 6.19 0 016.16 6.16v5.57m1.3 2.3v1a2.52 2.52 0 01-2.52 2.52H12m-8.75-8.82h2.59v3.85a1.29 1.29 0 01-1.29 1.29 1.291 1.291 0 01-1.3-1.29v-3.85zm14.92 0h1.29a1.29 1.29 0 011.3 1.27v2.55a1.29 1.29 0 01-2.58 0v-3.82h-.01z'
                            ></path>
                        </svg>
                    </a>
                </div>
                <div className='cursor-pointer relative'>
                    <div
                        onMouseDown={(e: any) => {
                            e.stopPropagation();
                            setModal(!modal);
                        }}
                    >
                        <img src='https://dev-api.jmember.co.kr/image/my_default.png' alt='mypage' width={36} />
                    </div>
                    {modal && (
                        <div
                            className='z-20 absolute flex flex-col justify-center right-0 mt-6 w-[192px] h-[116px] bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 text-sm'
                            ref={ref}
                        >
                            <a className='px-4 py-2'>내 정보</a>
                            <a className='px-4 py-2'>회사 정보</a>
                            <a className='px-4 py-2' href='/pages/signin'>
                                로그아웃
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </Header>
    );
}
