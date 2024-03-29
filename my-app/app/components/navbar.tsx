'use client';

import React, { useState } from 'react';
import { MenuItem, ServiceMenuItem } from '@/app/constants/data';
import { ArrowTopRightOnSquareIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { DashBoardIcon, GroupIcon, OperateIcon, ServiceIcon } from '@/app/components/icons';

const Navbar = ({
    selected,
    setSelected,
}: {
    selected: { id: string | null; subid: string | null };
    setSelected: any;
}) => {
    const [open, setOpen] = useState(Array(MenuItem.length).fill(true));

    const showDetail = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        /* menu 상세보기 */
        const i = Number(e.currentTarget.dataset.id);
        if (i) {
            setOpen(
                open.map((item, idx) => {
                    if (idx === i) {
                        return !item;
                    }
                    return item;
                })
            );
        }
    };

    const selectMenu = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        /* selected 메뉴 업데이트 */
        const { id, subid } = e.currentTarget.dataset;
        setSelected({
            id: id,
            subid: subid,
        });
    };

    const selectIcon = (id: string) => {
        /* menu icon 반환 */
        switch (id) {
            case 'dashboard':
                return <DashBoardIcon />;
            case 'group':
                return <GroupIcon />;
            case 'operate':
                return <OperateIcon />;
            case 'service':
                return <ServiceIcon />;
            default:
                return null;
        }
    };

    return (
        <div className='flex-1 z-10 w-64 bg-white pb-4 overflow-y-auto flex flex-col'>
            <nav className='mt-2 flex-1 text-[#0d1c4b] '>
                {MenuItem.map((menu: any, i: number) => {
                    return (
                        <div key={i}>
                            <div data-id={i} onClick={showDetail} className='cursor-pointer'>
                                {menu.hasOwnProperty('link') ? (
                                    <Link href={menu.link}>
                                        {/* 상세 menu 없는 경우 ex)대시보드 */}
                                        <div
                                            key={menu.id}
                                            data-id={menu.id}
                                            data-subid=''
                                            className={`hover:bg-active-blue hover:text-gray-900 pl-4 h-10 flex items-center px-4 py-2 text-main-navy text-md font-bold ${
                                                selected.id === menu.id &&
                                                selected.subid === '' &&
                                                'text-secondary bg-active-blue'
                                            }`}
                                            onClick={selectMenu}
                                        >
                                            <div
                                                className={`mr-2 ${
                                                    selected === menu.id && 'text-secondary'
                                                } h-5 w-5 flex justify-center items-center flex-shrink-0`}
                                            >
                                                {selectIcon(menu.icon)}
                                            </div>
                                            <p className='w-full'>{menu.name}</p>
                                        </div>
                                    </Link>
                                ) : (
                                    <div
                                        key={menu.id}
                                        className='hover:bg-active-blue hover:text-gray-900 pl-4 h-10 flex items-center px-4 py-2 text-main-navy text-md font-bold'
                                    >
                                        {/* 상세 menu 있는 경우 */}
                                        <div
                                            className={`mr-2 ${
                                                selected.id === menu.id && selected.subid !== '' && 'text-secondary'
                                            } h-5 w-5 flex justify-center items-center flex-shrink-0`}
                                        >
                                            {selectIcon(menu.icon)}
                                        </div>
                                        <p
                                            className={`w-full ${
                                                selected.id === menu.id && selected.subid !== '' && 'text-secondary'
                                            }`}
                                        >
                                            {menu.name}
                                        </p>
                                        {
                                            /* 상세 메뉴 있는 경우 화살표 렌더링 */
                                            menu.detail.length > 0 &&
                                                (open[i] ? (
                                                    <div>
                                                        <ChevronUpIcon width={16} color='rgb(156, 163, 175)' />
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <ChevronDownIcon width={16} color='rgb(156, 163, 175)' />
                                                    </div>
                                                ))
                                        }
                                    </div>
                                )}
                            </div>
                            {menu.detail.length > 0 && open[i] && (
                                <div className='mb-4'>
                                    {
                                        /* 상세 menu 있는 경우 렌더링 */
                                        menu.detail.map((m: any) => {
                                            return (
                                                <div
                                                    key={m.id}
                                                    data-id={menu.id}
                                                    data-subid={m.id}
                                                    className={`hover:bg-gray-50 hover:text-gray-900 h-9 flex items-center p-2 pl-11 text-main-navy text-sm ${
                                                        selected.id === menu.id &&
                                                        selected.subid === m.id &&
                                                        'text-secondary bg-active-blue'
                                                    }`}
                                                    onClick={selectMenu}
                                                >
                                                    <Link className='w-full' href={m.link}>
                                                        {m.name}
                                                    </Link>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>
            <nav className='px-4 pb-4'>
                <div className='text-xs mb-2 font-bold text-gray-400'>연결 서비스</div>
                <div className='text-main-navy font-bold text-sm'>
                    {ServiceMenuItem.map((service: any) => {
                        /* 연결 서비스 menu */
                        return (
                            <div key={service.id} className='h-8 flex'>
                                <Link className='flex items-center w-full' href={service.link} target='_blank'>
                                    <img src={service.icon} alt='icon' width={20} />
                                    <p className='flex-1 ml-3'>{service.name}</p>
                                    <ArrowTopRightOnSquareIcon width={20} className='text-gray-300' />
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
};
export default Navbar;
