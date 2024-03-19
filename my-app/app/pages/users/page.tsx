'use client'

import { Layout } from "@/app/src/components/layout";
import { Button, Box, Pagination, Stack, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Tooltip, Tabs, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";

import { ArrowPathIcon, QuestionMarkCircleIcon, PlusIcon, BarsArrowDownIcon, BarsArrowUpIcon } from "@heroicons/react/20/solid";
import { DataGrid, GridActionsCellItem, GridActionsCellItemProps, GridColDef, GridRowId } from "@mui/x-data-grid";
import { getUsers } from "@/app/src/api/user";
import { DataGridProps } from "@mui/x-data-grid";
import { PaginationProps } from "@mui/material";
import {styled} from '@mui/material/styles'
import DeleteIcon from '@mui/icons-material/Delete';

interface UserData {
    id: number;
    name: string;
    username?: string;
    email?: string;
    address?: string;
    phone?: string;
    createdAt?: Date;
}

export default function User() {
    const [selectedMenu, setSelectedMenu] = useState('user_management')
    const [userData, setUserData] = useState<UserData[] | null>(null)
    const [date, setDate] = useState<string>()
    const syncInfoText = `조직도 동기화란 변경된 조직도 정보를 연동 서비스에 적용하는 것을 말합니다.\n모든 변경된 정보는 동기화를 진행하셔야 연동 서비스에 반영됩니다.\n※ 조직도 정보 : 사용자 정보, 조직 정보, 관리자 정보`

    const CustomDataGrid = styled(DataGrid)<DataGridProps>(({theme}) => ({
        '& .MuiDataGrid-columnHeader' : {
            backgroundColor: 'rgb(249, 250, 251)',
            borderTop: '1px solid rgb(209, 213, 219);',
        },
        '& .MuiDataGrid-columnHeaderTitle' : {
            fontWeight: 500,
        },
        '& .MuiDataGrid-root .MuiDataGrid-cell:focus-within' : {
            outline: 'none !important'
        }
    }));

    const CustomPagination = styled(Pagination)<PaginationProps>(({theme}) => ({
        '& .MuiPaginationItem-root' : {
            borderRadius: '0.124rem'
        },
        '& .Mui-selected' : {
            backgroundColor: 'white !important',
            borderColor: 'rgb(18, 46, 135)'
        }
    }))

    const DateFormat = () => {
        const date = new Date()
        let month = date.getMonth() + 1;
        let day:number = date.getDate();
        let hour:number = date.getHours();
        let minute:number = date.getMinutes();
        let second:number = date.getSeconds();
        let result = date.getFullYear().toString() + "-"

        result += month >= 10 ? month : '0' + month;
        result = result + "-" + (day >= 10 ? day : '0' + day);
        result = result + " " + (hour >= 10 ? hour : '0' + hour);
        result = result + ":" + (minute >= 10 ? minute : '0' + minute);
        result = result + ":" + (second >= 10 ? second : '0' + second);

        return result;
    }

    const SortedDescendingIcon = () => {
        return <BarsArrowUpIcon width={16} height={16} className="ml-1 text-black"/>
    }

    const SortedAscendingIcon = () => {
        return <BarsArrowDownIcon width={16} height={16} className="ml-1 text-black"/>
    }

    useEffect(() => {
        const getUserData = async () => {
            const users = await getUsers()
            let newUsers:UserData[] = [];
            users.map((user:any) => {
                newUsers.push({
                    'id' : user.id,
                    'name' : user.name,
                    'username' : user.username,
                    'email' : user.email,
                    'address' : user.province + " " + user.city + " " + user.district + " " + user.street + " " + user.zipcode,
                    'phone' : user.phone,
                    'createdAt' : user.createdAt
                })
            })
            setUserData(newUsers)
            setDate(DateFormat())
        }
        getUserData();
    }, [])

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setSelectedMenu(newValue);
      };

    const deleteUser = React.useCallback(
        (id: GridRowId) => () => {
          setTimeout(() => {
            setUserData((prevRows) => {
              return prevRows ? prevRows.filter((row) => row.id !== id) : [];
            });
          });
        },
        [],
      );

    function DeleteUserActionItem({
        deleteUser,
        ...props
      }: GridActionsCellItemProps & { deleteUser: () => void }) {
        const [open, setOpen] = React.useState(false);
      
        return (
          <React.Fragment>
            <GridActionsCellItem {...props} onClick={() => setOpen(true)} />
            <Dialog
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">Delete this user?</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  This action cannot be undone.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button
                  onClick={() => {
                    setOpen(false);
                    deleteUser();
                  }}
                  color="warning"
                  autoFocus
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        );
      }

    const columns: GridColDef[] = [
        {field: 'id', headerName: '아이디', headerClassName: 'user-table-header', headerAlign: 'center', align: 'center', flex: 1},
        {field: 'name', headerName: '이름', headerClassName: 'user-table-header', headerAlign: 'center', align: 'center', flex: 1},
        {field: 'username', headerName: '유저명', headerClassName: 'user-table-header', headerAlign: 'center', align: 'center', flex: 1}, 
        {field: 'phone', headerName: '전화번호', headerClassName: 'user-table-header', headerAlign: 'center', align: 'center', flex: 1},
        {field: 'email', headerName: '이메일', headerClassName: 'user-table-header', headerAlign: 'center', align: 'center', flex: 1},
        {field: 'address', headerName: '주소', headerClassName: 'user-table-header', headerAlign: 'center', align: 'center', flex: 1},
        {field: 'createdAt', headerName: '등록일', headerClassName: 'user-table-header', headerAlign: 'center', align: 'center', flex: 1},
        {
            field: 'actions',
            type: 'actions',
            width: 80,
            getActions: (params) => [
              <DeleteUserActionItem
                key={params.id}
                label="Delete"
                showInMenu
                icon={<DeleteIcon />}
                deleteUser={deleteUser(params.id)}
                closeMenuOnClick={false}
              />,
            ],
          },
    ]

    return (
        <Layout>
            <div className="pt-8 pb-32 px-10">
                <div className="flex justify-between mb-8">
                    <div className="flex items-center">
                        <div className="text-2xl font-bold text-gray-900">사용자</div>
                        <Button variant="contained" className="bg-[#0d1c4b] mx-2 py-2 px-[13px] rounded-md" >
                            <ArrowPathIcon width={16} height={16} className="mr-1"/>
                            <div className="flex leading-4">조직도 동기화</div>
                        </Button>
                        <div className="text-gray-400 flex items-center">
                            <Tooltip title={syncInfoText} placement="right" componentsProps={{
                                tooltip: {
                                    sx: {
                                        bgcolor: 'white',
                                        color: '#374151',
                                        border: '1px solid rgb(229 231 235)',
                                        maxWidth: 500,
                                        whiteSpace: 'pre-wrap'
                                    }
                                }
                            }}>
                                <QuestionMarkCircleIcon width={16} height={16} className="cursor-pointer" />
                            </Tooltip>
                            <div className="ml-1 text-xs">마지막 동기화 일시 : {date}</div>
                        </div>                        
                    </div>
                    <div>
                        <Button variant="outlined" className="bg-white text-secondary border-secondary hover:border-secondary py-2 px-[13px] rounded-md">
                            <PlusIcon width={16} height={16} className="mr-1"/>
                            <div className="flex leading-4">엑셀 일괄 등록</div></Button>
                    </div>
                </div>
                {/*
                <nav className="flex">
                    {
                        UserMenuItem.map((userMenu) => {
                            return userMenu.id === selectedMenu ? (
                                <div className="border-b-2 border-secondary" key={userMenu.id} data-id={userMenu.id} onClick={ChangeSelectedMenu}>
                                    <Button className="px-5 py-2 text-sm hover:text-secondary hover:bg-transparent focus:outline-none font-bold text-secondary">{userMenu.name}</Button>
                                </div>
                            ) : (
                                <div className="border-b border-gray-200" key={userMenu.id} data-id={userMenu.id}  onClick={ChangeSelectedMenu}>
                                    <Button className="px-5 py-2 text-sm hover:text-secondary hover:bg-transparent focus:outline-none font-medium text-gray-500">{userMenu.name}</Button>
                                </div>
                            )
                        })
                    }
                    <div className="flex-1 border-b border-gray-200"></div>
                </nav>
                */}
                <Box>
                    <Tabs value={selectedMenu} onChange={handleChange}>
                        <Tab label="사용자 관리" value="user_management"></Tab>
                        <Tab label="퇴직자 목록" value="retirement_list"></Tab>
                    </Tabs>
                </Box>
                <div className="mt-8 bg-white rounded-xl p-8 min-w-min">
                    <div className="mb-2 text-sm text-gray-800">
                        총 {userData === null ? 0 : userData.length}명
                    </div>
                    <div className="flex justify-between items-center w-full mb-4">
                        <div className="flex">

                        </div>
                        <div>
                            <Button variant="outlined" className="rounded-md border-gray-300 text-gray-700 px-[11px] hover:border-gray-300 cursor-pointer">
                                <PlusIcon width={16} height={16}/>
                                <div className="font-medium ml-1 pr-1 text-xs">등록</div>
                            </Button>
                        </div>
                    </div>
                    {
                        userData && (<Box sx={{width: '100%', '&.user-table-header': {
                            backgroundColor: 'rgb(249, 250, 251)',
                            color: '#374151',
                        }}}>
                            <CustomDataGrid columns={columns} rows={userData} hideFooter disableColumnMenu columnHeaderHeight={39} rowHeight={45} sortingOrder={['asc', 'desc']} slots={{
                                columnSortedDescendingIcon: SortedDescendingIcon,
                                columnSortedAscendingIcon: SortedAscendingIcon
                            }} sx = {{
                                '.MuiDataGrid-columnSeperator' : {
                                    display: 'none'
                                },
                                '&.MuiDataGrid-root' : {
                                    border: 'none'
                                }
                            }}
                            />
                        </Box>)
                    }

                    <div className="flex items-center justify-center mt-6 w-full">
                        <Stack spacing={2}>
                            <CustomPagination count={1} variant="outlined" shape="rounded"/>
                        </Stack>
                    </div>
                </div>
            </div>
        </Layout>
    )
}