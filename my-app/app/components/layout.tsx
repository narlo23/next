import MainHeader from './mainheader';
import Navbar from './navbar';

export const Layout = ({ children }: { children?: React.ReactNode }) => {
    return (
        <div className='h-screen w-screen bg-gray-50 flex flex-col leading-4'>
            <MainHeader />
            <div className='h-full flex min-h-0'>
                <div className='flex bg-white border-r border-gray-200'>
                    <Navbar />
                </div>
                <div className='flex flex-col flex-1 overflow-auto'>{children}</div>
            </div>
        </div>
    );
};
