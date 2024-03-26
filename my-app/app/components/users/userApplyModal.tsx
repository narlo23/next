'use client';

import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, Button, TextField, styled, TextFieldProps } from '@mui/material';
import DialogHeader from './dialog/dialogHeader';
import { UserColumns } from '@/app/constants/data';

const CustomTextField = styled(TextField)<TextFieldProps>(() => ({
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

interface userInfo {
    name: string;
    username: string;
    phone: string;
    email: string;
    address: string;
    [key: string]: string;
}

interface PlaceholderMessage {
    username: string;
    email: string;
    [key: string]: string;
}

interface DisabledBtnType {
    username: boolean;
    email: boolean;
    [key: string]: boolean;
}

interface ErrorObject {
    name: boolean;
    username: boolean;
    phone: boolean;
    email: boolean;
    address: boolean;
    [key: string]: boolean;
}

const DEFAULT_IMG_URL = 'https://dev-api.jmember.co.kr/image/my_default.png';

const ERROR_MSG = {
    name: '이름을 입력해주세요.',
    username: '유저명을 입력해주세요.',
    phone: '전화번호를 입력해주세요.',
    email: '이메일을 입력해주세요.',
    address: '주소를 입력해주세요.',
};

const PLACEHOLDER_MSG: PlaceholderMessage = {
    username: '유저명을 입력하세요.',
    email: '이메일을 입력하세요.',
};

const UserApplyModal = ({
    open,
    onClose,
    onClick,
    state,
    info,
}: {
    open: boolean;
    onClose: () => void;
    onClick: () => void;
    state: string;
    info?: any;
}) => {
    const [value, setValue] = useState<userInfo>({
        name: '',
        username: '',
        phone: '',
        email: '',
        address: '',
    });
    const [error, setError] = useState<ErrorObject>({
        name: false,
        username: false,
        phone: false,
        email: false,
        address: false,
    });
    const [errorMsg, setErrorMsg] = useState<userInfo>({
        name: '',
        username: '',
        phone: '',
        email: '',
        address: '',
    });
    const [applyDisabled, setApplyDisabled] = useState(true); /* 등록 버튼 비활성화 여부 */
    const [duplicateCheck, setDuplicateCheck] = useState<DisabledBtnType>({
        username: false,
        email: false,
    }); /* 중복 확인 여부 */
    const [disabledDuplicateBtn, setDisabledDuplicateBtn] = useState<DisabledBtnType>({
        username: true,
        email: true,
    }); /* 중복 확인 버튼 비활성화 여부 */
    const [editProfileModal, setEditProfileModal] =
        useState(false); /* 프로필 편집 아이콘 클릭 시 나타나는 모달 창 display 여부 */
    const [selectedImgUrl, setSelectedImgUrl] = useState<any>(null); /* 선택된 프로필 이미지 url */

    const fileInputRef = useRef<any>(null);
    const modalRef = useRef<any>();

    const InputText = (event: ChangeEvent<HTMLInputElement>) => {
        const field: keyof typeof InputText = event.target.name as keyof typeof InputText;
        if (field) {
            if (field === 'username' || field === 'email') {
                /* 중복 확인이 필요한 username, email의 경우 */
                if (event.target.value === '') {
                    /* 입력 값이 없으면 중복 확인 버튼 비활성화 */
                    setDisabledDuplicateBtn({
                        ...disabledDuplicateBtn,
                        [field]: true,
                    });
                } else {
                    /* 입력 값이 있으면 중복 확인 버튼 활성화 */
                    setDisabledDuplicateBtn({
                        ...disabledDuplicateBtn,
                        [field]: false,
                    });
                }
                /* username, email의 value가 변경된 경우 중복 확인 여부 초기화 */
                setDuplicateCheck({
                    ...duplicateCheck,
                    [field]: false,
                });
            }
            setValue((prevValue) => ({
                ...prevValue,
                [field]: event.target.value,
            }));
            if (event.target.value === '') {
                setError((prevValue) => ({
                    ...prevValue,
                    [field]: true,
                }));
                setErrorMsg((prevValue) => ({
                    ...prevValue,
                    [field]: ERROR_MSG[field],
                }));
            } else {
                if (field === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    const email = event.target.value;
                    if (email.length < 4 || email.length > 50 || !emailRegex.test(email)) {
                        setError((prevValue) => ({
                            ...prevValue,
                            [field]: true,
                        }));
                        setErrorMsg((prevValue) => ({
                            ...prevValue,
                            [field]: '4~50자 사이 이메일 형식으로 입력하세요.',
                        }));
                    } else {
                        setError((prevValue) => ({
                            ...prevValue,
                            [field]: false,
                        }));
                        setErrorMsg((prevValue) => ({
                            ...prevValue,
                            [field]: '',
                        }));
                    }
                } else {
                    setError((prevValue) => ({
                        ...prevValue,
                        [field]: false,
                    }));
                    setErrorMsg((prevValue) => ({
                        ...prevValue,
                        [field]: '',
                    }));
                }
            }
        }
    };

    useEffect(() => {
        if (
            /* textfield가 모두 값이 존재하면서 중복 확인이 모두 이루어진 경우 */
            value.name !== '' &&
            value.username !== '' &&
            value.phone !== '' &&
            value.email !== '' &&
            value.address !== ''
        ) {
            /* 등록 버튼 활성화 */
            if (state === 'user_register') {
                if (duplicateCheck.email && duplicateCheck.username) {
                    setApplyDisabled(false);
                }
            } else {
                setApplyDisabled(false);
            }
        } else {
            /* 등록 버튼 비활성화 */
            setApplyDisabled(true);
        }
    }, [value, duplicateCheck, state]);

    const ChangeProfileBtnClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const SetDefaultImg = () => {
        setEditProfileModal(false);
        setSelectedImgUrl(null);
    };

    const CheckDuplicateUser = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        const { field } = event.currentTarget.dataset;
        if (field) {
            /* username, email duplicate check */
            setDuplicateCheck({
                ...duplicateCheck,
                [field]: true,
            });
            setDisabledDuplicateBtn({
                ...disabledDuplicateBtn,
                [field]: true,
            });
        }
    };

    const InputFile = (event: any) => {
        setEditProfileModal(false);
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            return new Promise<void>((resolve) => {
                reader.onload = () => {
                    setSelectedImgUrl(reader.result || null);
                    resolve();
                };
            });
        }
    };

    useEffect(() => {
        const handleClickOutside = (e: any) => {
            if (editProfileModal && (!modalRef.current || !modalRef.current.contains(e.target))) {
                setEditProfileModal(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [editProfileModal]);

    useEffect(() => {
        if (info) {
            const updatedValue = {
                name: info.row.name,
                username: info.row.username,
                phone: info.row.phone,
                email: info.row.email,
                address: info.row.address,
            };
            setValue(updatedValue);
        }
    }, [info]);

    return (
        <div className='w-full h-full flex items-center'>
            <Dialog open={open}>
                <DialogHeader title={state === 'user_register' ? '사용자 등록' : '사용자 수정'} onClose={onClose} />
                <DialogContent className='p-0 overflow-y-auto max-h-[610px]'>
                    <div className='overflow-y-auto max-h-[610px] px-[1.5rem] pt-[1.5rem] pb-[2.5rem]'>
                        <div className='flex'>
                            <div>
                                <div className='relative'>
                                    <div className='w-32 h-32 rounded-[55px] overflow-hidden flex justify-center'>
                                        <img
                                            src={selectedImgUrl ? selectedImgUrl : DEFAULT_IMG_URL}
                                            alt='user'
                                            width={128}
                                            height={128}
                                            className='object-cover'
                                        />
                                    </div>
                                    <div className='absolute flex-shrink-0 z-40 cursor-pointer right-0 bottom-0'>
                                        <div className='relative flex items-center justify-center w-10 h-10 border-[1px] bg-white border-gray-300 rounded-full'>
                                            <div
                                                onMouseDown={(e: any) => {
                                                    e.stopPropagation();
                                                    setEditProfileModal(!editProfileModal);
                                                }}
                                            >
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    viewBox='0 0 20 20'
                                                    fill='currentColor'
                                                    aria-hidden='true'
                                                    className='items-center justify-center w-5 h-5 text-gray-500'
                                                >
                                                    <path d='M14.9 2a2.92 2.92 0 00-2.08.86l-1.39 1.39 4.16 4.16 1.39-1.39a2.922 2.922 0 00.86-2.08A2.94 2.94 0 0014.9 2zM10.49 5.19L2.2 13.48a.67.67 0 00-.2.47v3.25a.67.67 0 00.67.67h3.18a.63.63 0 00.47-.2l8.32-8.32-4.15-4.16z'></path>
                                                </svg>
                                                <input
                                                    type='file'
                                                    className='hidden'
                                                    ref={fileInputRef}
                                                    accept='image/*'
                                                    onChange={InputFile}
                                                />
                                            </div>
                                            {editProfileModal && (
                                                <div
                                                    className='absolute w-40 z-40 py-1 bg-white rounded-md shadow-lg left-8 top-5'
                                                    ref={modalRef}
                                                >
                                                    <section
                                                        className='block py-2 px-4 text-sm text-gray-700 cursor-pointer hover:bg-gray-100'
                                                        onClick={ChangeProfileBtnClick}
                                                    >
                                                        프로필 변경
                                                    </section>
                                                    {selectedImgUrl && (
                                                        <section
                                                            className='block py-2 px-4 text-sm text-gray-700 cursor-pointer hover:bg-gray-100'
                                                            onClick={SetDefaultImg}
                                                        >
                                                            기본 이미지로 설정
                                                        </section>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col flex-1 ml-9 gap-5'>
                                {UserColumns.map((userColumn) => {
                                    return (
                                        !userColumn.disabled && (
                                            <div key={userColumn.field}>
                                                <label className='flex mb-1 text-left text-xs font-medium text-gray-700'>
                                                    {userColumn.required && (
                                                        <span className='mr-1 text-red-500'>*</span>
                                                    )}
                                                    {userColumn.name}
                                                </label>
                                                {userColumn.duplicateCheck ? (
                                                    state === 'user_register' ? (
                                                        <div className='flex justify-between'>
                                                            <CustomTextField
                                                                name={userColumn.field}
                                                                variant='outlined'
                                                                fullWidth
                                                                error={error[userColumn.field]}
                                                                inputProps={{
                                                                    style: {
                                                                        fontSize: '0.75rem',
                                                                        padding: '10px 12px',
                                                                        height: '18px',
                                                                        lineHeight: '1rem',
                                                                        color: '#6b7280',
                                                                        boxShadow: 'none',
                                                                    },
                                                                }}
                                                                value={value[userColumn.field]}
                                                                onChange={InputText}
                                                                placeholder={PLACEHOLDER_MSG[userColumn.field]}
                                                                className='w-[205px]'
                                                            />
                                                            <Button
                                                                data-field={userColumn.field}
                                                                variant='outlined'
                                                                className='py-[10px] px-[15px] text-gray-700 text-sm flex leading-4 border-gray-300 hover:bg-gray-100 hover:border-gray-300 disabled:bg-gray-50 disabled:text-gray-300'
                                                                disabled={disabledDuplicateBtn[userColumn.field]}
                                                                onClick={CheckDuplicateUser}
                                                            >
                                                                중복 확인
                                                            </Button>
                                                        </div>
                                                    ) : (
                                                        <div className='flex justify-between'>
                                                            <CustomTextField
                                                                name={userColumn.field}
                                                                variant='outlined'
                                                                error={error[userColumn.field]}
                                                                fullWidth
                                                                disabled
                                                                inputProps={{
                                                                    style: {
                                                                        fontSize: '0.75rem',
                                                                        padding: '10px 12px',
                                                                        height: '18px',
                                                                        lineHeight: '1rem',
                                                                        color: '#6b7280',
                                                                        boxShadow: 'none',
                                                                    },
                                                                }}
                                                                value={value[userColumn.field]}
                                                            />
                                                        </div>
                                                    )
                                                ) : (
                                                    <CustomTextField
                                                        name={userColumn.field}
                                                        variant='outlined'
                                                        error={error[userColumn.field]}
                                                        fullWidth
                                                        inputProps={{
                                                            style: {
                                                                fontSize: '0.75rem',
                                                                padding: '10px 12px',
                                                                height: '18px',
                                                                lineHeight: '1rem',
                                                                color: '#6b7280',
                                                                boxShadow: 'none',
                                                            },
                                                        }}
                                                        value={value[userColumn.field]}
                                                        onChange={InputText}
                                                    />
                                                )}
                                                {errorMsg[userColumn.field] && (
                                                    <div className='flex items-center text-[#d01e17] text-xs leading-[1.66rem]'>
                                                        <svg
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            viewBox='0 0 20 20'
                                                            fill='currentColor'
                                                            aria-hidden='true'
                                                            className='w-4 h-4 mr-1 text-dangerOr'
                                                        >
                                                            <path
                                                                fillRule='evenodd'
                                                                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                                                                clipRule='evenodd'
                                                            ></path>
                                                        </svg>
                                                        {errorMsg[userColumn.field]}
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <div className='flex justify-end bg-gray-50 border-t-2 border-gray-100 p-5 text-sm'>
                    <Button
                        variant='outlined'
                        className='w-24 rounded-md text-[#374151] bg-white border-1 border-gray-300 hover:bg-gray-100 hover:border-gray-300 py-[10px] leading-4'
                        onClick={onClose}
                    >
                        취소
                    </Button>
                    <Button
                        variant='contained'
                        className='w-24 rounded-md bg-main-navy text-white hover:bg-secondary ml-2 py-[10px] leading-4'
                        disabled={applyDisabled}
                        onClick={onClick}
                    >
                        {state === 'user_register' ? '등록' : '저장'}
                    </Button>
                </div>
            </Dialog>
        </div>
    );
};

export default UserApplyModal;
