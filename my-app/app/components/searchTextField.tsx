import { FormControl, TextField, InputAdornment } from '@mui/material';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/20/solid';

interface SearchTextFieldProps {
    placeholder?: string;
    value?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    visibility: 'hidden' | 'visible';
    onDelete: () => void;
}

const SearchTextField = ({ placeholder, value, onChange, visibility, onDelete }: SearchTextFieldProps) => {
    return (
        <FormControl>
            <TextField
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                sx={{
                    marginLeft: '-1px',
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <MagnifyingGlassIcon className='w-5 h-5 text-gray-400' />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position='end'>
                            <XMarkIcon
                                className='w-5 text-[#0d1c4b] cursor-pointer'
                                style={{ visibility: visibility }}
                                onClick={onDelete}
                            />
                        </InputAdornment>
                    ),
                    sx: {
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#0d1c4b',
                        },
                        input: {
                            fontSize: '0.75rem',
                            lineHeight: '1rem',
                            padding: '10px 12px',
                            color: 'rgb(107, 114, 128)',
                            height: '18px',
                        },
                        'input:focus': {
                            boxShadow: 0,
                        },
                    },
                }}
            />
        </FormControl>
    );
};
export default SearchTextField;
