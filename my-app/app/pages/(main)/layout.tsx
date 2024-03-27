'use client';

import MainHeader from '@/app/components/mainheader';
import Navbar from '@/app/components/navbar';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

const MainLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const [selectedMenu, setSelectedMenu] = useState({ id: 'dashboard', subid: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const login = localStorage.getItem('login');
        if (!login) {
            redirect('/pages/signin');
        } else {
            setLoading(false);
        }
    }, []);

    return !loading ? (
        <div className='h-screen w-screen bg-gray-50 flex flex-col leading-4'>
            <MainHeader setSelected={setSelectedMenu} />
            <div className='h-full flex min-h-0'>
                <div className='flex bg-white border-r border-gray-200'>
                    <Navbar selected={selectedMenu} setSelected={setSelectedMenu} />
                </div>
                <div className='flex flex-col flex-1 overflow-auto'>{children}</div>
            </div>
        </div>
    ) : (
        <></>
    );
};
export default MainLayout;
