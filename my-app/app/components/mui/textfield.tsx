import { styled, TextField, TextFieldProps } from '@mui/material';

export const CustomTextField = styled(TextField)<TextFieldProps>(() => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: '0.375rem',
        '& fieldset': {
            border: '1px solid #d1d5db',
        },
        '& fieldset:hover': {
            borderColor: '',
        },
        '&.Mui-focused fieldset': {
            borderWidth: '1px',
            borderColor: '#122e87',
        },
        '&.Mui-disabled fieldset': {
            borderColor: '#d1d5db',
        },
    },
    '& .Mui-error .MuiOutlinedInput-notchedOutline': {
        borderColor: '#ff4d26',
    },
    '& .Mui-disabled': {
        backgroundColor: '#f3f4f6',
        color: '#d1d5db',
    },
}));
