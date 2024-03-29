import { styled, Button, ButtonProps } from '@mui/material';

export const CustomCancelBtn = styled(Button)<ButtonProps>(() => ({
    width: '96px',
    borderRadius: '0.375rem',
    color: '#374151',
    backgroundColor: 'white',
    border: '1px solid #d1d5db',
    padding: '10px 0',
    ':hover': {
        backgroundColor: '#f3f4f6',
        borderColor: '#d1d5db',
    },
}));

export const CustomFilledBtn = styled(Button)<ButtonProps>(() => ({
    width: '96px',
    marginLeft: '8px',
    padding: '10px 0',
    backgroundColor: '#0d1c4b',
    color: 'white !important',
    borderRadius: '0.375rem',
    ':hover': {
        backgroundColor: '#122e87',
    },
}));

export const CustomRegistrationBtn = styled(Button)<ButtonProps>(() => ({
    borderColor: '#d1d5db',
    color: '#374151',
    padding: '5px 11px',
    cursor: 'pointer',
    borderRadius: '0.375rem',
    ':hover': {
        borderColor: '#d1d5db',
        backgroundColor: '#f3f4f6',
    },
}));

export const CustomDuplicateBtn = styled(Button)<ButtonProps>(() => ({
    padding: '10px 15px',
    color: '#374151',
    fontSize: '14px',
    display: 'flex',
    lineHeight: '1rem',
    borderColor: '#d1d5db',
    marginLeft: '4px',
    ':hover': {
        borderColor: '#d1d5db',
        backgroundColor: '#f3f4f6',
    },
    ':disabled': {
        backgroundColor: '#f9fafb',
        color: '#d1d5db',
    },
}));
