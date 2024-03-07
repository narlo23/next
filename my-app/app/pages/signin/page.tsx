"use client"

import React, { useRef, useState } from "react";
import Image from "next/image";
import { IconButton, InputLabel} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Button } from "@mui/material"
import {ExclamationCircleIcon} from '@heroicons/react/20/solid'
import { useRouter } from "next/navigation";

export default function Login() {
    const idRef = useRef<any>(null);
    const pwRef = useRef<any>(null);
    const [errorText, setErrorText] = useState(["", ""])
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleLoginClick = () => {
        if (idRef.current && pwRef.current) {
            const currentId = idRef.current.value;
            const currentPw = pwRef.current.value;

            if (currentId !== "" && currentPw !== "") {
                // 대시보드로 이동
                router.push("/pages/dashboard")
            }

            let newErrorText = [...errorText]
            if (currentId === "") {
                newErrorText[0] = "아이디를 입력하세요"
                idRef.current.classList.add('ring-error')
            } else {
                newErrorText[0] = ""
                idRef.current.classList.remove('ring-error')
            }
            if (currentPw === "") {
                newErrorText[1] = "비밀번호를 입력하세요"
                pwRef.current.classList.add('ring-error')
            } else {
                newErrorText[1] = ""
                pwRef.current.classList.remove('ring-error')
            }
            setErrorText(newErrorText)
        }
    }

    return (
        <div className="h-screen w-screen bg-gray-50 flex flex-col items-center">
            <div className="flex flex-col justify-center flex-1 py-12 sm:px-6 lg:px-8 w-[920px]">
                <div className="pl-2 mb-4">
                    <Image src="/logo.png" width={192} height={40} alt="LOGO" ></Image>
                </div>
                <div className="w-full h-[500px] flex flex-row shadow-md">
                    <div className="w-[472px] h-full rounded-l-3xl px-16 py-12 bg-white">
                        <div className="text-main-navy mt-2 w-full text-primary font-bold text-lg">로그인</div>
                        <div className="mt-5 text-xs">
                            <InputLabel htmlFor="idInput" className="mb-1 flex text-left text-xs leading-6 text-gray-900">아이디</InputLabel>
                            <input id="idInput" type="text" ref={idRef} placeholder="아이디" className="block w-full rounded-md border-0 py-2.5 text-gray-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-1 focus:ring-inset focus:ring-main-navy text-xs leading-4"/>
                            {errorText && errorText[0] !== "" && (
                                <div className="text-xs text-error flex items-center" id="email-error">
                                <ExclamationCircleIcon className="h-4 w-4 text-error mr-1" aria-hidden="true" />{errorText[0]}
                                </div>
                            )}
                        </div>
                        <div className="mt-4 text-xs">
                            <InputLabel htmlFor="pwInput" className="mb-1 flex text-left text-xs leading-6 text-gray-900">비밀번호</InputLabel>
                            <div className="relative">
                                <input id="pwInput" ref={pwRef} type={showPassword ? 'text' : 'password'} placeholder="비밀번호" className="block w-full rounded-md border-0 py-2.5 text-gray-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-1 focus:ring-inset focus:ring-main-navy text-xs leading-4"/>
                                <div className="cursor-pointer absolute top-0 right-0">
                                    <IconButton aria-label="toggle password visibility" className="text-gray-300" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                                    {showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </div>  
                                {errorText && errorText[1] !== "" && (
                                <div className="text-xs text-error flex" id="email-error">
                                <ExclamationCircleIcon className="h-4 w-4 text-error mr-1" aria-hidden="true" />{errorText[1]}
                                </div>
                            )} 
                            </div>
                        </div>
                        <div className="flex items-center justify-end mt-3">
                            <p className="text-sm text-main-navy underline cursor-pointer">비밀번호 찾기</p>
                        </div>
                        <div className="mt-4">
                            <Button type="button" variant="contained" className="w-full bg-main-navy rounded-md text-base py-[10px] px-[15px] hover:bg-main-blue" onClick={handleLoginClick}>
                                <div className="flex text-sm leading-4">
                                    로그인
                                </div>
                            </Button>
                        </div>
                    </div>
                    <div className="w-[388px] h-full rounded-r-3xl bg-main-navy"></div>
                </div>
                <div className="flex justify-between w-full p-3 mt-4">
                    <div className="text-xs text-center text-gray-400">Copyright 2024©JIRANSOFT All rights reserved.</div>
                    <div className="flex space-x-4">
                        <p className="text-xs text-gray-500 underline cursor-pointer">개인정보처리방침</p>
                        <p className="text-xs text-gray-500 underline cursor-pointer">이용약관</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
