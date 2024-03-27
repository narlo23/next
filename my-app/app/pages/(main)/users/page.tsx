'use client';
import React, { useEffect, useState } from 'react';
import { Button, Box, Pagination, Stack, Tooltip, Tabs, Tab, PaginationProps, TabsProps } from '@mui/material';
import CustomToolbar from '@/app/components/users/customToolbar';

import {
    ArrowPathIcon,
    QuestionMarkCircleIcon,
    PlusIcon,
    BarsArrowDownIcon,
    BarsArrowUpIcon,
} from '@heroicons/react/20/solid';
import {
    DataGrid,
    GridColDef,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
    DataGridProps,
    GridEventListener,
    GridRowParams,
} from '@mui/x-data-grid';
import { getUsers } from '@/app/api/user';
import { styled } from '@mui/material/styles';
import { useQuery } from 'react-query';
import UserInfoModal from '@/app/components/users/userInfoModal';
import UserApplyModal from '@/app/components/users/userApplyModal';

interface UserData {
    id: number;
    name: string;
    username?: string;
    email?: string;
    address?: string;
    phone?: string;
    createdAt?: Date;
}

const CustomDataGrid = styled(DataGrid)<DataGridProps>(() => ({
    '.MuiDataGrid-columnHeader': {
        backgroundColor: 'rgb(249, 250, 251)',
        borderTop: '1px solid rgb(209, 213, 219);',
    },
    '.MuiDataGrid-columnHeaderTitle': {
        fontWeight: 500,
    },
    '.MuiDataGrid-virtualScroller': {
        borderBottom: '1px solid rgb(209, 213, 219)',
    },
    '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus': {
        outline: 'none !important',
    },
    '.MuiDataGrid-columnHeader:focus-within': {
        outline: 'none',
    },
    '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
        outline: 'none !important',
    },
    '.MuiDataGrid-row.Mui-selected': {
        backgroundColor: 'white',
    },
    '.MuiDataGrid-row.Mui-selected.Mui-hovered': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
    '.MuiDataGrid-columnHeaders:hover .MuiDataGrid-columnSeparator': {
        visibility: 'hidden',
    },
}));

const CustomTabs = styled(Tabs)<TabsProps>(() => ({
    '.MuiTab-root': {
        padding: '8px 20px',
        fontWeight: 'bold',
        lineHeight: '1.25rem',
        minHeight: '36px',
    },
    '.Mui-selected': {
        color: '#122e87 !important',
    },
}));

const StyledPagination = styled(Pagination)<PaginationProps>(() => ({
    '.MuiPaginationItem-root': {
        borderRadius: '0.124rem',
    },
    '.Mui-selected': {
        backgroundColor: 'white !important',
        borderColor: 'rgb(18, 46, 135)',
    },
}));

const CustomPagination = () => {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
        <div className='flex items-center justify-center mt-6 w-full'>
            <Stack spacing={2}>
                <StyledPagination
                    count={pageCount}
                    page={page + 1}
                    variant='outlined'
                    shape='rounded'
                    onChange={(event, value) => apiRef.current.setPage(value - 1)}
                />
            </Stack>
        </div>
    );
};

const DateFormat = () => {
    const date = new Date();
    let month = date.getMonth() + 1;
    let day: number = date.getDate();
    let hour: number = date.getHours();
    let minute: number = date.getMinutes();
    let second: number = date.getSeconds();
    let result = date.getFullYear().toString() + '-';

    result += month >= 10 ? month : '0' + month;
    result = result + '-' + (day >= 10 ? day : '0' + day);
    result = result + ' ' + (hour >= 10 ? hour : '0' + hour);
    result = result + ':' + (minute >= 10 ? minute : '0' + minute);
    result = result + ':' + (second >= 10 ? second : '0' + second);

    return result;
};

const fetchUserList = async () => {
    const users = await getUsers();
    let newUsers: UserData[] = [];
    users.map((user: any) => {
        newUsers.push({
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            address: user.province + ' ' + user.city + ' ' + user.district + ' ' + user.street + ' ' + user.zipcode,
            phone: user.phone,
            createdAt: user.createdAt,
        });
    });
    return newUsers;
};

const User = () => {
    const [selectedMenu, setSelectedMenu] = useState('user_management');
    const [date, setDate] = useState<string>('');
    const { isLoading, error, data } = useQuery('userlist', fetchUserList, {
        refetchOnWindowFocus: false,
    });
    const [filteredData, setFilteredData] = useState<UserData[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [modalParams, setModalParams] = useState<GridRowParams>();

    const SYNC_INFO_TEXT = `조직도 동기화란 변경된 조직도 정보를 연동 서비스에 적용하는 것을 말합니다.\n모든 변경된 정보는 동기화를 진행하셔야 연동 서비스에 반영됩니다.\n※ 조직도 정보 : 사용자 정보, 조직 정보, 관리자 정보`;

    useEffect(() => {
        setDate(DateFormat());
    }, []);

    useEffect(() => {
        if (data !== undefined) {
            setFilteredData(data);
        }
    }, [data]);

    const SortedDescendingIcon = () => {
        return <BarsArrowDownIcon width={16} height={16} className='ml-1 text-gray-500' />;
    };

    const SortedAscendingIcon = () => {
        return <BarsArrowUpIcon width={16} height={16} className='ml-1 text-gray-500' />;
    };

    const searchKeyword = (searchCriteria: string, value: string) => {
        if (data !== undefined) {
            setFilteredData(
                data.filter((d: any) => {
                    return d[searchCriteria].toString().includes(value);
                })
            );
        }
    };

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setSelectedMenu(newValue);
    };

    const gridRowClick: GridEventListener<'rowClick'> = (params, event, details) => {
        setModalContent('user_info');
        setShowModal(true);
        setModalParams(params);
    };

    const closeModal = () => {
        setShowModal(false);
        setModalContent('');
        setModalParams(undefined);
    };

    const registerUser = () => {
        setShowModal(true);
        setModalContent('user_register');
    };

    const modifyBtnClick = () => {
        setModalContent('user_modify');
    };

    const storeModifyResult = () => {
        setShowModal(false);
        setModalContent('');
        setModalParams(undefined);
    };

    const registerUserResult = () => {
        setShowModal(false);
        setModalContent('');
        setModalParams(undefined);
    };

    const DisplayModal = () => {
        if (showModal) {
            if (modalContent === 'user_info') {
                /* 사용자 정보 */
                if (modalParams) {
                    return (
                        <UserInfoModal
                            userInfo={modalParams}
                            open={showModal}
                            onClose={closeModal}
                            onClick={modifyBtnClick}
                        />
                    );
                }
            } else if (modalContent === 'user_register') {
                /* 사용자 등록 */
                return (
                    <UserApplyModal
                        open={showModal}
                        onClose={closeModal}
                        state={modalContent}
                        onClick={registerUserResult}
                    />
                );
            } else if (modalContent === 'user_modify') {
                /* 사용자 수정 */
                if (modalParams) {
                    return (
                        <UserApplyModal
                            open={showModal}
                            onClose={closeModal}
                            state={modalContent}
                            info={modalParams}
                            onClick={storeModifyResult}
                        />
                    );
                }
            }
        }
        return <></>;
    };

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: '아이디',
            headerClassName: 'user-table-header',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
        },
        {
            field: 'name',
            headerName: '이름',
            headerClassName: 'user-table-header',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
        },
        {
            field: 'username',
            headerName: '유저명',
            headerClassName: 'user-table-header',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
        },
        {
            field: 'phone',
            headerName: '전화번호',
            headerClassName: 'user-table-header',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
        },
        {
            field: 'email',
            headerName: '이메일',
            headerClassName: 'user-table-header',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
        },
        {
            field: 'address',
            headerName: '주소',
            headerClassName: 'user-table-header',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
        },
        {
            field: 'createdAt',
            headerName: '등록일',
            headerClassName: 'user-table-header',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
        },
        {
            field: 'actions',
            type: 'actions',
            width: 80,
            getActions: (params) => [],
        },
    ];

    return (
        <>
            <DisplayModal />
            <div className='pt-8 pb-32 px-10 min-w-min'>
                <div className='flex justify-between mb-8'>
                    <div className='flex items-center'>
                        <div className='text-2xl font-bold text-gray-900'>사용자</div>
                        <Button
                            variant='contained'
                            className='bg-[#0d1c4b] mx-2 py-2 px-[13px] rounded-md hover:bg-secondary'
                        >
                            <ArrowPathIcon width={16} height={16} className='mr-1' />
                            <div className='flex leading-4'>조직도 동기화</div>
                        </Button>
                        <div className='text-gray-400 flex items-center'>
                            <Tooltip
                                title={SYNC_INFO_TEXT}
                                placement='right'
                                componentsProps={{
                                    tooltip: {
                                        sx: {
                                            bgcolor: 'white',
                                            color: '#374151',
                                            border: '1px solid rgb(229 231 235)',
                                            maxWidth: 500,
                                            whiteSpace: 'pre-wrap',
                                        },
                                    },
                                }}
                            >
                                <QuestionMarkCircleIcon width={16} height={16} className='cursor-pointer' />
                            </Tooltip>
                            <div className='ml-1 text-xs'>마지막 동기화 일시 : {date}</div>
                        </div>
                    </div>
                    <div>
                        <Button
                            variant='outlined'
                            className='bg-white text-secondary border-secondary hover:border-secondary hover:bg-[#d5dbf0] py-2 px-[13px] rounded-md'
                        >
                            <PlusIcon width={16} height={16} className='mr-1' />
                            <div className='flex leading-4'>엑셀 일괄 등록</div>
                        </Button>
                    </div>
                </div>
                <Box>
                    <CustomTabs
                        value={selectedMenu}
                        onChange={handleChange}
                        TabIndicatorProps={{
                            style: {
                                backgroundColor: '#122e87',
                            },
                        }}
                        sx={{
                            minHeight: '36px',
                            height: '36px',
                            borderBottom: '1px solid #e5e7eb',
                        }}
                    >
                        <Tab label='사용자 관리' value='user_management'></Tab>
                        <Tab label='퇴직자 목록' value='retirement_list'></Tab>
                    </CustomTabs>
                </Box>
                <div className='mt-8 bg-white rounded-xl p-8 w-full min-w-min'>
                    <div className='mb-2 text-sm text-gray-800'>
                        {filteredData.length === data?.length
                            ? `총 ${data.length}명`
                            : `검색 결과 ${filteredData.length}명`}
                    </div>
                    {data && (
                        <Box
                            sx={{
                                width: '100%',
                                '&.user-table-header': {
                                    backgroundColor: 'rgb(249, 250, 251)',
                                    color: '#374151',
                                },
                            }}
                        >
                            <CustomDataGrid
                                columns={columns}
                                rows={filteredData}
                                pagination
                                autoHeight
                                disableColumnMenu
                                hideFooterSelectedRowCount
                                columnHeaderHeight={39}
                                rowHeight={45}
                                onRowClick={gridRowClick}
                                initialState={{
                                    pagination: { paginationModel: { pageSize: 5 } },
                                }}
                                slots={{
                                    columnSortedDescendingIcon: SortedDescendingIcon,
                                    columnSortedAscendingIcon: SortedAscendingIcon,
                                    toolbar: CustomToolbar,
                                    pagination: CustomPagination,
                                }}
                                slotProps={{
                                    toolbar: {
                                        data: columns,
                                        setData: searchKeyword,
                                        registerUser: registerUser,
                                    },
                                }}
                                sx={{
                                    '.MuiDataGrid-columnSeperator': {
                                        display: 'none',
                                    },
                                    '&.MuiDataGrid-root': {
                                        border: 'none',
                                    },
                                }}
                            />
                        </Box>
                    )}
                </div>
            </div>
        </>
    );
};
export default User;
