import { ChangeEvent } from 'react';
import ModalTextField from './modalTextField';
import { CustomDuplicateBtn } from './mui/buttons';

interface ModalTextFieldProps {
    field: string;
    error: boolean;
    value: string;
    onInput?: (event: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    fullWidth?: boolean;
    inputProps?: any;
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const ModalDuplicateTextField = ({
    field,
    error,
    value,
    fullWidth,
    onInput,
    placeholder,
    disabled,
    onClick,
}: ModalTextFieldProps) => {
    return (
        <div className='flex justify-between h-[38px] whitespace-nowrap'>
            <ModalTextField
                field={field}
                error={error}
                value={value}
                fullWidth={fullWidth}
                onInput={onInput}
                placeholder={placeholder}
            />
            <CustomDuplicateBtn data-field={field} variant='outlined' disabled={disabled} onClick={onClick}>
                중복 확인
            </CustomDuplicateBtn>
        </div>
    );
};
export default ModalDuplicateTextField;
