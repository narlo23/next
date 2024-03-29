import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import QueryProvider from '@/app/hooks/provider';
import '@/public/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'OfficeNEXT',
    description: 'Generated by create next app',
    icons: {
        icon: 'https://dev-org.officenext.net/favicon.ico',
    },
};

const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <html lang='ko'>
            <body className={inter.className}>
                <QueryProvider>{children}</QueryProvider>
            </body>
        </html>
    );
};
export default RootLayout;
