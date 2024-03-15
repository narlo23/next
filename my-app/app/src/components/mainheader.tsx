'use client'

import Header from "@/app/src/components/header";
import { Button } from "@mui/material";
import { QuestionMarkCircleIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function MainHeader() {
    const [modal, setModal] = useState<boolean>(false)

    const ref = useRef<any>()
    
    useEffect(() => {
        const handleClickOutside=(e:any)=> {
            if (modal && (!ref.current || !ref.current.contains(e.target))){
                setModal(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [modal])

    return (
        <Header pad="px-8">
                <div className="flex text-black gap-4">
                    <Link href="https://jiransoft.gitbook.io/manual/" target="_blank">
                        <Button variant="outlined" className="border-[#d1d5db] hover:border-[#d1d5db]" startIcon={<QuestionMarkCircleIcon className="text-main-navy" width={16}/>}>
                            <div className="text-main-navy">
                                사용가이드
                            </div>
                        </Button>
                    </Link>
                    <div className="cursor-pointer relative">
                        <div onMouseDown={(e:any) => {
                            e.stopPropagation()
                            setModal(!modal)
                    }   }>
                            <UserCircleIcon width={36}/>
                        </div>
                        {
                            modal && (
                                <div className="z-20 absolute flex flex-col justify-center right-0 mt-6 w-[192px] h-[116px] bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 text-sm" ref={ref}>
                                    <a className="px-4 py-2">내 정보</a>
                                    <a className="px-4 py-2">회사 정보</a>
                                    <a className="px-4 py-2" href="/pages/signin">로그아웃</a>
                                </div>
                            )
                        }
                    </div>
                </div>
            </Header>
    )
}