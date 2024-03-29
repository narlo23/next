import React, { useState } from 'react';
import { ChevronDownIcon, MagnifyingGlassIcon, PlusIcon, XMarkIcon } from '@heroicons/react/20/solid';
import {
    Button,
    FormControl,
    InputAdornment,
    MenuItem,
    Select,
    SelectChangeEvent,
    SelectProps,
    TextField,
    styled,
    ButtonProps,
} from '@mui/material';
import { GridColDef, GridToolbarContainer } from '@mui/x-data-grid';

const StyledSelect = styled(Select)<SelectProps>(() => ({
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

const CustomRegistrationBtn = styled(Button)<ButtonProps>(() => ({
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

const CustomToolbar = ({
    data,
    setData,
    registerUser,
}: {
    data: GridColDef[];
    setData: (searchCriteria: string, value: string) => void;
    registerUser: () => void;
}) => {
    const [searchCriteria, setSearchCriteria] = useState('id');
    const VISIBLE_FIELDS = ['id', 'name', 'username', 'email', 'address'];
    const [searchWord, setSearchWord] = useState('');
    const [showClearIcon, setShowClearIcon] = useState(false);

    const handleSelectChange = (event: SelectChangeEvent<unknown>) => {
        setSearchCriteria(event.target.value as string);
        setData(event.target.value as string, searchWord);
    };

    const handleDeleteClick = (): void => {
        /*검색어 초기화*/
        setSearchWord('');
        setData(searchCriteria, '');
        setShowClearIcon(false);
    };

    const changeInputText = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setShowClearIcon(event.target.value === '' ? false : true);
        setSearchWord(event.target.value);
        setData(searchCriteria, event.target.value);
    };

    return (
        <GridToolbarContainer className='flex justify-between gap-0 mb-4'>
            <div className='text-xs'>
                <FormControl>
                    <StyledSelect
                        variant='outlined'
                        value={searchCriteria}
                        onChange={handleSelectChange}
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
                    </StyledSelect>
                </FormControl>
                <FormControl>
                    <TextField
                        value={searchWord}
                        placeholder='검색어 입력'
                        onChange={changeInputText}
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
                                        style={{ visibility: showClearIcon ? 'visible' : 'hidden' }}
                                        onClick={handleDeleteClick}
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
                    ></TextField>
                </FormControl>
            </div>
            <div>
                <CustomRegistrationBtn variant='outlined' onClick={registerUser}>
                    <PlusIcon width={16} height={16} />
                    <div className='font-medium ml-1 pr-1 text-xs'>등록</div>
                </CustomRegistrationBtn>
            </div>
        </GridToolbarContainer>
    );
};
export default CustomToolbar;
