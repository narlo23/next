const DashBoardIcon = ({ width, height, color }: { width?: number; height?: number; color?: string }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            width={width}
            height={height}
            viewBox='0 0 25 24'
            strokeWidth='2'
            stroke='currentColor'
            aria-hidden='true'
        >
            <path
                fill={color}
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeMiterlimit='10'
                d='M8.25 16v-5m4 5V8m4 8v-3m1 8h-10c-2.2 0-4-1.8-4-4V7c0-2.2 1.8-4 4-4h10c2.2 0 4 1.8 4 4v10c0 2.2-1.8 4-4 4z'
            ></path>
        </svg>
    );
};
export default DashBoardIcon;
