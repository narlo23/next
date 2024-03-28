'use client';
import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { ExclamationCircleIcon, PlusIcon } from '@heroicons/react/20/solid';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { Button, styled, ButtonProps } from '@mui/material';
import Slider from 'react-slick';

const CustomAddBtn = styled(Button)<ButtonProps>(() => ({
    borderColor: '#d1d5db',
    backgroundColor: 'white',
    fontSize: '12px',
    fontWeight: 'medium',
    color: '#374151',
    padding: '10px 23px',
    lineHeight: '1rem',
    borderRadius: '0.375rem',
    ':hover': {
        backgroundColor: 'white',
        borderColor: '#d1d5db',
    },
}));

const CustomServicePageBtn = styled(Button)<ButtonProps>(() => ({
    backgroundColor: 'white',
    width: '96px',
    fontSize: '12px',
    lineHeight: '1rem',
    padding: '5px 11px',
    borderColor: '#d1d5db',
    color: '#374151',
    borderRadius: '0.375rem',
    ':hover': {
        backgroundColor: 'white',
        borderColor: '#d1d5db',
    },
}));

const DashBoard = () => {
    const username = '안효진';

    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplayspeed: 2000,
    };

    return (
        <div className='flex-1 text-main-navy text-xs flex flex-col p-5 min-w-[73rem] max-w-7xl pb-32 pt-8 px-10'>
            <div className='text-3xl text-black'>
                <span className='mr-1 font-bold'>{username}님,</span> 안녕하세요.
            </div>
            <div className='grid gap-3 mt-10 md:grid-cols-2 lg:grid-cols-3'>
                <div className='col-span-1 drop-shadow-sm bg-white border p-6 rounded-lg h-[254px] flex flex-col'>
                    <div className='flex justify-between'>
                        <div className='text-gray-800 text-lg font-bold'>구독 정보</div>
                        <div className='flex cursor-pointer bg-[#f3f4f6] rounded-2xl h-6 px-2 items-center text-[#4b5563]'>
                            <ExclamationCircleIcon width={16} className='mr-1' />
                            <span className='underline underline-offset-2'>Professional 플랜</span>을 구독 해보세요
                        </div>
                    </div>
                    <div className='grid grid-cols-[1fr_2fr]'>
                        <div className='mt-3'>
                            <svg className='w-20 h-20' viewBox='0 0 80 80'>
                                <defs>
                                    <path
                                        id='shapeSquircle'
                                        d='M0.0219049 40.0042C0.0219049 40.0042 -1.00694 60.9621 11.0374 70.9399C17.6538 76.421 25.2281 80.1018 40.0042 79.9776C40.0042 79.9776 60.9621 81.0153 70.9399 68.9709C76.421 62.3545 80.1018 54.7802 79.9776 40.0042C79.9776 40.0042 81.0152 19.0463 68.9709 9.06847C62.3545 3.58731 54.7802 -0.102264 40.0042 0.0219041C40.0042 0.0219041 19.0374 -1.00692 9.06848 11.0374C3.58733 17.6893 -0.102264 25.237 0.0219049 40.0042Z'
                                    ></path>
                                    <clipPath id='clipSquircle'>
                                        <use href='#shapeSquircle'></use>
                                    </clipPath>
                                </defs>
                                <rect
                                    className='fill-white-svg fill-gray-500'
                                    data-color='10'
                                    clipPath='url(#clipSquircle)'
                                    x='0'
                                    y='0'
                                    width='80'
                                    height='80'
                                ></rect>
                                <text
                                    className='text-4xl font-bold fill-white'
                                    x='50%'
                                    y='50%'
                                    dy='12'
                                    textAnchor='middle'
                                >
                                    F
                                </text>
                            </svg>
                        </div>
                        <div className='flex self-center mt-3 text-xl font-bold text-gray-500 gap-x-8'>
                            <div>Free 플랜</div>
                            <ChevronRightIcon width={24} height={24} className='text-gray-300 cursor-pointer' />
                        </div>
                        <div className='mt-3 font-medium text-gray-600'>라이선스</div>
                        <div className='mt-3 font-medium text-gray-600'>5 User</div>
                        <div className='mt-1 font-medium text-gray-600'>구독 기간</div>
                        <div className='mt-1 font-medium text-gray-600'>2024.03.06~2025.03.05</div>
                    </div>
                </div>
                <div className='col-span-2 drop-shadow-sm bg-white border p-6 rounded-lg h-[254px]'>
                    <div className='text-gray-800 text-lg font-bold'>조직도 등록 현황</div>
                    <div className='grid grid-cols-[240px_auto]'>
                        <div className='flex flex-col gap-y-2 w-60 h-40 items-center border-r'>
                            <div className='text-sm text-gray-500 mt-7'>전체인원</div>
                            <div className='flex gap-x-3 items-center'>
                                <div className='text-5xl font-extrabold'>2</div>
                                <div className='text-2xl text-gray-600'>명</div>
                            </div>
                            <div>
                                <CustomAddBtn variant='outlined'>추가하기</CustomAddBtn>
                            </div>
                        </div>
                        <div className='text-lg text-gray-600 flex ml-[10px]'>
                            <div className='flex flex-col gap-y-2 py-9 px-2.5'>
                                <div>
                                    <div className='flex items-center justify-center'>
                                        <span className='text-secondary text-4xl font-bold mr-1'>2</span>명
                                    </div>
                                </div>
                                <div className='flex gap-x-2 items-center'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 25 24'
                                        strokeWidth='2'
                                        stroke='currentColor'
                                        aria-hidden='true'
                                        className='w-8 h-8 text-secondary'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M16.06 10.71h4.41m-2.2 2.21V8.51m-7.63 1.97A3.24 3.24 0 107.4 7.25a3.23 3.23 0 003.24 3.23zm0 2.37c-3.76 0-6.39 1.89-6.39 4.6a.65.65 0 00.3.55c.17.12 1.78 1.14 5.92 1.14 4.29 0 6.14-1.07 6.22-1.11a.68.68 0 00.33-.58c0-2.71-2.63-4.6-6.38-4.6z'
                                        ></path>
                                    </svg>
                                    <div>
                                        <div className='text-sm test-gray-600'>신규 등록</div>
                                        <div className='text-xs text-gray-400'>(24.01 ~ 24.03)</div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-y-2 py-9 px-2.5'>
                                <div>
                                    <div className='flex items-center justify-center'>
                                        <span className='text-danger text-4xl font-bold mr-1'>4</span>명
                                    </div>
                                </div>
                                <div className='flex gap-x-2 items-center'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 31 31'
                                        strokeWidth='2'
                                        stroke='currentColor'
                                        aria-hidden='true'
                                        className='w-8 h-8 text-danger'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M20.262 13.887h5.513M13.488 13.6a4.05 4.05 0 10-4.05-4.037 4.038 4.038 0 004.05 4.037zm0 2.963c-4.7 0-7.988 2.362-7.988 5.75a.813.813 0 00.375.687c.213.15 2.225 1.425 7.4 1.425 5.362 0 7.675-1.338 7.775-1.387a.85.85 0 00.412-.726c0-3.387-3.287-5.75-7.974-5.75z'
                                        ></path>
                                    </svg>
                                    <div>
                                        <div className='text-sm test-gray-600'>퇴직 처리</div>
                                        <div className='text-xs text-gray-400'>(24.01 ~ 24.03)</div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-y-2 py-9 px-2.5'>
                                <div>
                                    <div className='flex items-center justify-center'>
                                        <span className='text-gray-400 text-4xl font-bold mr-1'>0</span>명
                                    </div>
                                </div>
                                <div className='flex gap-x-2 items-center'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 25 24'
                                        strokeWidth='2'
                                        stroke='currentColor'
                                        aria-hidden='true'
                                        className='w-8 h-8 text-gray-400'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M15.11 17.02c.538.055 1.079.082 1.62.08a9.83 9.83 0 004.66-.83.501.501 0 00.25-.44c0-2-2-3.44-4.78-3.44a5.5 5.5 0 00-3.87 1.31m3.87-3.63a2.43 2.43 0 10.02-4.86 2.43 2.43 0 00-.02 4.86zm-8.23.39A3.23 3.23 0 105.4 7.23a3.24 3.24 0 003.23 3.23zm0 2.37c-3.75 0-6.38 1.9-6.38 4.6a.68.68 0 00.29.56c.17.11 1.78 1.13 5.93 1.13 4.15 0 6.14-1.06 6.21-1.11a.66.66 0 00.33-.58c.04-2.7-2.62-4.6-6.38-4.6z'
                                        ></path>
                                    </svg>
                                    <div className='text-sm test-gray-600'>미소속 사용자</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-span-2 drop-shadow-sm bg-white border p-6 rounded-lg h-[254px]'>
                    <div className='w-full h-full'>
                        <Slider arrows={false} {...settings}>
                            <img src='/assets/banner/banner_1.png' alt='banner' className='rounded-lg' />
                            <img src='/assets/banner/banner_2.png' alt='banner' className='rounded-lg' />
                        </Slider>
                    </div>
                </div>
                <div className='flex justify-between col-span-1 drop-shadow-sm bg-white border p-6 rounded-lg h-[254px]'>
                    <div className='text-gray-800 text-lg font-bold'>공지사항</div>
                    <button
                        className='h-7 w-7 border rounded-md flex items-center justify-center hover:bg-gray-100 cursor-pointer'
                        onClick={() => {
                            window.open('https://jiran.tistory.com/');
                        }}
                    >
                        <PlusIcon width={20} height={20}></PlusIcon>
                    </button>
                </div>
            </div>
            <div className='flex flex-col col-span-3 mt-3 gap-y-6'>
                <div className='text-lg font-bold'>사용 서비스</div>
                <div className='grid grid-cols-4 gap-y-10 gap-x-3'>
                    <div className='w-full mr-4 flex flex-col bg-white shadow h-36 rounded-xl'>
                        <div className='px-6 pt-3 flex flex-1 justify-between items-start'>
                            <div className='text-lg font-bold text-gray-700'>오피스웨이브</div>
                            <img
                                width={36}
                                alt='officewave'
                                src='https://dev-org.officenext.net/_next/image?url=https%3A%2F%2Fdev-api.jmember.co.kr%2Fapi%2Fimages%2F417c3f64-4b22-41ee-a852-b4a7767c3277&w=96&q=75'
                            ></img>
                        </div>
                        <div className='bg-gray-50 px-6 py-2 mt-2 border-t rounded-b-xl flex justify-between items-center'>
                            <div
                                className='cursor-pointer flex items-center text-main-navy'
                                onClick={() => {
                                    window.open('https://jiransoft.gitbook.io/manual/guide/officenext/officewave');
                                }}
                            >
                                사용가이드
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth='2'
                                    stroke='currentColor'
                                    aria-hidden='true'
                                    className='w-4 h-3 text-primary'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4'
                                    ></path>
                                </svg>
                            </div>
                            <CustomServicePageBtn
                                variant='outlined'
                                className='bg-white w-24 rounded-md text-xs px-[11px] border-gray-300 text-gray-700 hover:border-gray-300 hover:bg-white'
                                onClick={() => {
                                    window.open('https://jiranmembership.co.kr/solutions-officewave');
                                }}
                            >
                                서비스페이지
                            </CustomServicePageBtn>
                        </div>
                    </div>
                    <div className='w-full mr-4 flex flex-col bg-white shadow h-36 rounded-xl'>
                        <div className='px-6 pt-3 flex flex-1 justify-between items-start'>
                            <div className='text-lg font-bold text-gray-700'>오피스노트</div>
                            <img
                                width={36}
                                alt='officenote'
                                src='https://dev-org.officenext.net/_next/image?url=https%3A%2F%2Fdev-api.jmember.co.kr%2Fapi%2Fimages%2Ffa4038bc-54b8-4502-91df-dd8d5d57e757&w=96&q=75'
                            ></img>
                        </div>
                        <div className='bg-gray-50 px-6 py-2 mt-2 border-t rounded-b-xl flex justify-between items-center'>
                            <div
                                className='cursor-pointer flex items-center text-main-navy'
                                onClick={() => {
                                    window.open('https://jiransoft.gitbook.io/manual/guide/officenext/officewave');
                                }}
                            >
                                사용가이드
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth='2'
                                    stroke='currentColor'
                                    aria-hidden='true'
                                    className='w-4 h-3 text-primary'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4'
                                    ></path>
                                </svg>
                            </div>
                            <CustomServicePageBtn
                                variant='outlined'
                                onClick={() => {
                                    window.open('https://www.officenote.co.kr/dashboard');
                                }}
                            >
                                서비스페이지
                            </CustomServicePageBtn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DashBoard;
