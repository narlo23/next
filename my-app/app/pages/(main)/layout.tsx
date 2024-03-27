'use client';

import '@/app/styles/globals.css';
import MainHeader from '@/app/components/mainheader';
import Navbar from '@/app/components/navbar';
import { useState } from 'react';

const MainLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const [selectedMenu, setSelectedMenu] = useState({ id: 'dashboard', subid: '' });

    return (
        <div className='h-screen w-screen bg-gray-50 flex flex-col leading-4'>
            <MainHeader setSelected={setSelectedMenu} />
            <div className='h-full flex min-h-0'>
                <div className='flex bg-white border-r border-gray-200'>
                    <Navbar selected={selectedMenu} setSelected={setSelectedMenu} />
                </div>
                <div className='flex flex-col flex-1 overflow-auto'>{children}</div>
            </div>
        </div>
    );
};
export default MainLayout;
