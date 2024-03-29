import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/20/solid';
import { SelectChangeEvent } from '@mui/material';
import { GridColDef, GridToolbarContainer } from '@mui/x-data-grid';
import { CustomRegistrationBtn } from '@/app/components/mui/buttons';
import SearchTextField from '../searchTextField';
import SearchSelect from '../searchSelect';

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
                <SearchSelect value={searchCriteria} onChange={handleSelectChange} data={data} />
                <SearchTextField
                    placeholder='검색어 입력'
                    value={searchWord}
                    onChange={changeInputText}
                    visibility={showClearIcon ? 'visible' : 'hidden'}
                    onDelete={handleDeleteClick}
                />
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
