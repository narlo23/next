const CloseIcon = ({ width, height, color }: { width?: number; height?: number; color?: string }) => {
    return (
        <svg
            width={width}
            height={height}
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='2'
            stroke='currentColor'
            aria-hidden='true'
            className='dialog-header-close-icon'
        >
            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' fill={color}></path>
        </svg>
    );
};
export default CloseIcon;
