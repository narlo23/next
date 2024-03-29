import { FormControl, MenuItem, SelectChangeEvent } from '@mui/material';
import { CustomSelect } from './mui/selects';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { GridColDef } from '@mui/x-data-grid';

interface SearchSelectProps {
    value: string;
    onChange: (event: SelectChangeEvent<unknown>) => void;
    data: GridColDef[];
}

const VISIBLE_FIELDS = ['id', 'name', 'username', 'email', 'address'];

const SearchSelect = ({ value, onChange, data }: SearchSelectProps) => {
    return (
        <FormControl>
            <CustomSelect
                variant='outlined'
                value={value}
                onChange={onChange}
                IconComponent={ChevronDownIcon}
                MenuProps={{
                    sx: {
                        '.MuiMenuItem-root': {
                            fontSize: '12px',
                        },
                        '.Mui-selected': {
                            backgroundColor: 'white !important',
                            fontWeight: 700,
                            color: '#0d1c4b',
                        },
                        '.Mui-selected:hover': {
                            backgroundColor: '#e4e8f9 !important',
                        },
                        '.MuiMenuItem-root:hover': {
                            backgroundColor: '#e4e8f9',
                        },
                    },
                }}
            >
                {data.map((d: any, i: number) => {
                    if (VISIBLE_FIELDS.includes(d.field)) {
                        return (
                            <MenuItem value={d.field} key={i}>
                                {d.headerName}
                            </MenuItem>
                        );
                    }
                })}
            </CustomSelect>
        </FormControl>
    );
};
export default SearchSelect;
