'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '@/app/components/header';
import { Button, ButtonProps, styled } from '@mui/material';
import { QuestionMarkCircleIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const MainHeader = ({ setSelected }: { setSelected: any }) => {
    const [modal, setModal] = useState<boolean>(false);
    const router = useRouter();

    const ref = useRef<any>();

    const CustomButton = styled(Button)<ButtonProps>(() => ({
        border: '1px solid #d1d5db',
        padding: '8px 13px',
        borderRadius: '0.375rem',
        ':hover': {
            border: '1px solid #d1d5db',
            backgroundColor: 'rgb(243, 244, 246)',
        },
    }));

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

    const logout = () => {
        const login = localStorage.getItem('login');
        if (login) {
            router.push('/pages/logout');
        }
    };

    return (
        <Header pad='px-8' setSelected={setSelected}>
            <div className='flex text-black gap-4 items-center'>
                <Link href='https://jiransoft.gitbook.io/manual/' target='_blank'>
                    <CustomButton
                        variant='outlined'
                        startIcon={<QuestionMarkCircleIcon className='text-secondary' width={16} />}
                    >
                        <div className='text-secondary h-5 flex items-center'>사용가이드</div>
                    </CustomButton>
                </Link>
                <div className='w-7 h-7'>
                    {/* 고객지원 icon, href 추가 필요 */}
                    <Link href=''>
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
                    </Link>
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
                            <a className='px-4 py-2 cursor-pointer'>내 정보</a>
                            <a className='px-4 py-2 cursor-pointer'>회사 정보</a>
                            <a className='px-4 py-2 cursor-pointer' onClick={logout}>
                                로그아웃
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </Header>
    );
};
export default MainHeader;
