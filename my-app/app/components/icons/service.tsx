const ServiceIcon = ({ width, height, color }: { width?: number; height?: number; color?: string }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width={width}
            height={height}
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='2'
            stroke='currentColor'
            aria-hidden='true'
        >
            <path
                fill={color}
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
            ></path>
        </svg>
    );
};
export default ServiceIcon;
