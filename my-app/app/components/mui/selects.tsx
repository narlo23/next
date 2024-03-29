import { styled, Select, SelectProps } from '@mui/material';

export const CustomSelect = styled(Select)<SelectProps>(() => ({
    width: '128px',
    height: '2.375rem',
    fontSize: '12px',
    '&.MuiSelect-root': {
        borderRadius: 0,
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderTopRightRadius: '0px',
        borderBottomRightRadius: '0px',
    },
    '& .MuiOutlinedInput-input': {
        padding: '0.75rem 14px',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#0d1c4b',
    },
    svg: {
        width: '1.25rem',
        height: '100%',
        position: 'absolute',
        top: 0,
        right: '0.5rem',
        color: 'rgb(156, 163, 175)',
    },
    '.MuiButtonBase-root-MuiMenuItem-root': {
        backgroundColor: 'white',
    },
}));
