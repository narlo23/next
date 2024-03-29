'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@mui/material';
import DialogHeader from '@/app/components/users/dialog/dialogHeader';
import { UserColumns } from '@/app/constants/data';
import Buttons from '../buttons';
import { useMutation } from 'react-query';
import { addUser, modifyUser } from '@/app/api/user';
import { CustomDuplicateBtn } from '../mui/buttons';
import { ErrorIcon } from '../icons';
import ProfileInput from '../profileInput';
import ModalTextField from '../modalTextField';
import { ERROR_MSG, PLACEHOLDER_MSG } from '@/app/constants/data';
import ModalDuplicateTextField from '../modalDuplicateTextField';

interface UserInfo {
    name: string;
    username: string;
    phone: string;
    email: string;
    address: string;
    [key: string]: string;
}

interface DisabledBtnType {
    username: {
        value: boolean;
        disabled: boolean;
    };
    email: {
        value: boolean;
        disabled: boolean;
    };
    [key: string]: {
        value: boolean;
        disabled: boolean;
    };
}

interface ErrorObject {
    name: { value: boolean; text: string };
    username: { value: boolean; text: string };
    phone: { value: boolean; text: string };
    email: { value: boolean; text: string };
    address: { value: boolean; text: string };
    [key: string]: { value: boolean; text: string };
}

const UserApplyModal = ({
    open,
    onClose,
    onClick,
    state,
    info,
    refetch,
}: {
    open: boolean;
    onClose: () => void;
    onClick: () => void;
    state: string;
    info?: any;
    refetch?: any;
}) => {
    const addUserMutation = useMutation((data: UserInfo) => addUser(data), {
        onError: (error) => {
            console.error('Post 요청 실패', error);
        },
        onSuccess: () => {
            refetch();
        },
    });
    const modifyUserMutation = useMutation(({ id, data }: { id: number; data: UserInfo }) => modifyUser(id, data), {
        onError: (error) => {
            console.error('Post 요청 실패', error);
        },
        onSuccess: () => {
            refetch();
        },
    });
    const [value, setValue] = useState<UserInfo>({
        name: '',
        username: '',
        phone: '',
        email: '',
        address: '',
    });
    const [error, setError] = useState<ErrorObject>({
        name: { value: false, text: '' },
        username: { value: false, text: '' },
        phone: { value: false, text: '' },
        email: { value: false, text: '' },
        address: { value: false, text: '' },
    });
    const [applyDisabled, setApplyDisabled] = useState(true); /* 등록 버튼 비활성화 여부 */
    const [duplicateBtn, setDuplicateBtn] = useState<DisabledBtnType>({
        username: {
            value: false,
            disabled: true,
        },
        email: {
            value: false,
            disabled: true,
        },
    });

    const isContentNotNull = () => {
        /* textfield가 모두 값이 존재하면서 중복 확인이 모두 이루어진 경우 */
        return (
            value.name !== '' &&
            value.username !== '' &&
            value.phone !== '' &&
            value.email !== '' &&
            value.address !== ''
        );
    };

    const InputText = (event: ChangeEvent<HTMLInputElement>) => {
        const field: keyof typeof InputText = event.target.name as keyof typeof InputText;
        if (field) {
            if (field === 'username' || field === 'email') {
                /* 중복 확인이 필요한 username, email의 경우 */
                if (event.target.value === '') {
                    /* 입력 값이 없으면 중복 확인 버튼 비활성화 */
                    setDuplicateBtn({
                        ...duplicateBtn,
                        [field]: {
                            value: false,
                            disabled: true,
                        },
                    });
                } else {
                    /* 입력 값이 있으면 중복 확인 버튼 활성화 */
                    setDuplicateBtn({
                        ...duplicateBtn,
                        [field]: {
                            value: false,
                            disabled: false,
                        },
                    });
                }
            }
            setValue((prevValue) => ({
                ...prevValue,
                [field]: event.target.value,
            }));
            if (event.target.value === '') {
                setError((prevValue) => ({
                    ...prevValue,
                    [field]: {
                        value: true,
                        text: ERROR_MSG[field],
                    },
                }));
            } else {
                if (field === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    const email = event.target.value;
                    if (email.length < 4 || email.length > 50 || !emailRegex.test(email)) {
                        setError((prevValue) => ({
                            ...prevValue,
                            [field]: {
                                value: true,
                                text: '4~50자 사이 이메일 형식으로 입력하세요.',
                            },
                        }));
                    } else {
                        setError((prevValue) => ({
                            ...prevValue,
                            [field]: {
                                value: false,
                                text: '',
                            },
                        }));
                    }
                } else {
                    setError((prevValue) => ({
                        ...prevValue,
                        [field]: {
                            value: false,
                            text: '',
                        },
                    }));
                }
            }
        }
    };

    useEffect(() => {
        if (isContentNotNull()) {
            /* 등록 버튼 활성화 */
            if (state === 'user_register') {
                if (duplicateBtn.email.value && duplicateBtn.username.value) {
                    setApplyDisabled(false);
                }
            } else {
                setApplyDisabled(false);
            }
        } else {
            /* 등록 버튼 비활성화 */
            setApplyDisabled(true);
        }
    }, [value, duplicateBtn, state]);

    const CheckDuplicateUser = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        const { field } = event.currentTarget.dataset;
        if (field) {
            /* username, email duplicate check */
            setDuplicateBtn({
                ...duplicateBtn,
                [field]: {
                    value: true,
                    disabled: true,
                },
            });
        }
    };

    const AddUser = () => {
        onClick();
        addUserMutation.mutate(value);
    };

    const ModifyUser = () => {
        onClick();
        modifyUserMutation.mutate({ id: info.row.id, data: value });
    };

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
                            <ProfileInput />
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
                                                        <ModalDuplicateTextField
                                                            field={userColumn.field}
                                                            error={error[userColumn.field].value}
                                                            value={value[userColumn.field]}
                                                            fullWidth={true}
                                                            onInput={InputText}
                                                            placeholder={PLACEHOLDER_MSG[userColumn.field]}
                                                            disabled={duplicateBtn[userColumn.field].disabled}
                                                            onClick={CheckDuplicateUser}
                                                        />
                                                    ) : (
                                                        <div className='flex justify-between'>
                                                            <ModalTextField
                                                                field={userColumn.field}
                                                                error={error[userColumn.field].value}
                                                                fullWidth={true}
                                                                disabled={true}
                                                                value={value[userColumn.field]}
                                                            />
                                                        </div>
                                                    )
                                                ) : (
                                                    <ModalTextField
                                                        field={userColumn.field}
                                                        error={error[userColumn.field].value}
                                                        fullWidth={true}
                                                        value={value[userColumn.field]}
                                                        onInput={InputText}
                                                    />
                                                )}
                                                {error[userColumn.field].text && (
                                                    <div className='flex items-center text-[#d01e17] text-xs leading-[1.66rem]'>
                                                        <ErrorIcon />
                                                        {error[userColumn.field].text}
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
                <Buttons
                    leftBtnText='취소'
                    rightBtnText={state === 'user_register' ? '등록' : '저장'}
                    onClose={onClose}
                    onClick={state === 'user_register' ? AddUser : ModifyUser}
                    disabled={applyDisabled}
                />
            </Dialog>
        </div>
    );
};

export default UserApplyModal;
