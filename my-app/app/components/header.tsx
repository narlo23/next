import React from 'react';
import Link from 'next/link';
import { LogoIcon } from '@/app/components/icons';

type HeaderProps = {
    pad?: string;
    shadow?: string;
    children?: React.ReactNode;
    setSelected?: any;
};

const Header = ({ pad, shadow = 'sm', children, setSelected }: HeaderProps) => {
    const selectMenu = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        const { id, subid } = e.currentTarget.dataset;
        setSelected({
            id: id,
            subid: subid,
        });
    };

    return (
        <header
            className={`flex items-center justify-between py-4 ${pad} bg-white shadow-${shadow} border-b border-border-gray`}
        >
            <Link href={'/pages/dashboard'} onClick={selectMenu} data-id='dashboard' data-subid=''>
                <LogoIcon />
            </Link>
            {children}
        </header>
    );
};

export default Header;
