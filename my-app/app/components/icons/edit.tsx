const EditIcon = ({ width, height, color }: { width?: number; height?: number; color?: string }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            width={width}
            height={height}
            fill='currentColor'
            aria-hidden='true'
            className='items-center justify-center w-5 h-5 text-gray-500'
        >
            <path
                fill={color}
                d='M14.9 2a2.92 2.92 0 00-2.08.86l-1.39 1.39 4.16 4.16 1.39-1.39a2.922 2.922 0 00.86-2.08A2.94 2.94 0 0014.9 2zM10.49 5.19L2.2 13.48a.67.67 0 00-.2.47v3.25a.67.67 0 00.67.67h3.18a.63.63 0 00.47-.2l8.32-8.32-4.15-4.16z'
            ></path>
        </svg>
    );
};
export default EditIcon;
