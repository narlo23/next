import '@/app/styles/globals.css';

const MainLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return <div className='h-screen w-screen bg-gray-50 flex flex-col'>{children}</div>;
};
export default MainLayout;
