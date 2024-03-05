"use client"

import React from "react"
import Header from "@/app/components/header"
import Text from "@/app/components/text"
import { Input } from "@mui/base"

export default function Check() {

    return (
        <div className="h-screen w-screen bg-white flex flex-col">
            <Header />
            <div className="flex flex-col justify-center items-center flex-1">
                <Text size="2xl" paragraph="STEP 1/2 - 본인 확인" weight="bold" props="mb-5"/>
                <Text size="3xl" paragraph="이메일 주소를 입력하고" weight="bold"/>
                <Text size="3xl" paragraph="무료 체험을 시작해보세요." weight="bold"/>
                <div className="text-gray-700 ">
                    <label className="mb-1 flex text-left text-xs">
                        <p className="text-red-500 mr-1">*</p>
                        이메일
                    </label>
                </div>
            </div>
        </div>
    )
}