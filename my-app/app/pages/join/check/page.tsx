"use client"

import React, { useRef } from "react"
import Header from "@/app/components/header"
import Text from "@/app/components/text"
import { Button } from "@mui/material"
import {ExclamationCircleIcon} from '@heroicons/react/20/solid'

export default function Check() {
    const emailRef = React.useRef<HTMLInputElement>(null)
    const [errorText, setErrorText] = React.useState("")

    /*
    const InputEmailVal = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    */

    const Submit = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (emailRef.current) {
            const email = emailRef.current.value
            if (email.length <= 0) {
                setErrorText("이메일을 입력하세요.")
            }
            // 이메일 validation 추가
            else if (email.length < 4 || email.length > 50 || !emailRegex.test(email)) {
                setErrorText("4~50자 사이 이메일 형식으로 입력하세요.")
            }
            else {
                setErrorText("")
            }
        } else {
            alert("오류가 발생했습니다.")
        }
    }

    return (
        <div className="h-screen w-screen bg-gray-50 flex flex-col">
            <Header pad="pl-4"/>
            <div className="flex text-main-navy justify-center flex-1">
                <div className="w-80 h-full flex flex-col items-center justify-center">
                    <p className="text-2xl font-bold mb-5">STEP 1/2 - 본인 확인</p>
                    <p className="text-3xl font-bold">이메일 주소를 입력하고</p>
                    <p className="text-3xl font-bold">무료 체험을 시작해보세요.</p>
                    <div className="text-gray-700 mt-7 w-full">
                        <div>
                        <label htmlFor="email" className="mb-1 flex text-left text-xs leading-6 text-gray-900">
                        <p className="text-red-500 mr-1">*</p>
                            이메일
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <input
                            type="email"
                            name="email"
                            id="email"
                            className="block w-full rounded-md border-0 py-2.5 text-gray-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-1 focus:ring-inset focus:ring-main-navy text-xs leading-4"
                            placeholder="관리자 아이디로 사용할 이메일을 입력하세요."
                            aria-invalid="true"
                            aria-describedby="email-error"
                            ref={emailRef}
                            />
                        </div>
                        {
                            errorText !== "" && (
                                <div className="text-xs text-error flex" id="email-error">
                                    <ExclamationCircleIcon className="h-4 w-4 text-error mr-1" aria-hidden="true" />{errorText}
                                </div>
                            )
                        }
                        </div>
                        <div className="text-xs mt-1 text-main-blue">
                        입력주신 이메일로 인증 메일이 발송될 예정입니다. <br /> 이메일 인증 후 오피스넥스트 회원가입을 이어서 진행해 주세요.
                        </div>
                        <div className="mt-8">
                            <Button type="button" variant="contained" className="w-full bg-main-navy rounded-md text-base py-4 px-7 hover:bg-main-blue" onClick={Submit}>
                                <div className="flex text-base leading-4">
                                    무료 체험하기
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}