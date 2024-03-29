import { ChangeEvent } from 'react';
import { CustomTextField } from './mui/textfield';

interface ModalTextFieldProps {
    field: string;
    error: boolean;
    value: string;
    onInput?: (event: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    disabled?: boolean;
    fullWidth?: boolean;
    inputProps?: any;
}

const inputPropsStyle = {
    fontSize: '0.75rem',
    padding: '10px 12px',
    height: '18px',
    lineHeight: '1rem',
    color: '#6b7280',
    boxShadow: 'none',
};

const ModalTextField = ({
    field,
    error,
    value,
    onInput,
    placeholder,
    disabled = false,
    fullWidth = false,
}: ModalTextFieldProps) => {
    return (
        <CustomTextField
            name={field}
            variant='outlined'
            fullWidth={fullWidth}
            error={error}
            inputProps={{
                inputMode: `${field === 'phone' ? 'numeric' : 'text'}`,
                style: inputPropsStyle,
            }}
            value={value}
            onChange={onInput}
            placeholder={placeholder}
            disabled={disabled}
        />
    );
};
export default ModalTextField;
