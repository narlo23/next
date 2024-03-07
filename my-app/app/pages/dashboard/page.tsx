"use client"

import Header from "@/app/components/header";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import { QuestionMarkCircleIcon, ArrowTopRightOnSquareIcon, ChevronUpIcon, ChevronDownIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { MenuItem, ServiceMenuItem } from "@/app/constants/data";

export default function DashBoard() {
    const [open, setOpen] = useState(Array(MenuItem.length).fill(true))
    const [modal, setModal] = useState<boolean>(false)
    const ref = useRef<any>()

    const ShowDetail = (e:React.MouseEvent<HTMLElement, MouseEvent>) => {
        const i = Number(e.currentTarget.dataset.id)
        if (i) {
            setOpen(open.map((item, idx) => {
                if (idx === i) {
                    return !item
                }
                return item
            }))
        }
    }

    useEffect(() =>{
        console.log(modal)
    }, [modal])

    useEffect(() => {
        const handleClickOutside=(e:any)=> {
            if (ref && ref.current && !ref.current.contains(e.target as Node)) {
                setModal(false)
            }
        }

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [])

    return (
        <div className="h-screen w-screen bg-gray-50 flex flex-col">
            <Header pad="px-8">
                <div className="flex text-black gap-4">
                    <Link href="https://jiransoft.gitbook.io/manual/" target="_blank">
                        <Button variant="outlined" className="border-[#d1d5db] hover:border-[#d1d5db]" startIcon={<QuestionMarkCircleIcon className="text-main-navy" width={16}/>}>
                            <div className="text-main-navy">
                                사용가이드
                            </div>
                        </Button>
                    </Link>
                    <div className="cursor-pointer relative" onClick={(e:React.MouseEvent<HTMLElement, MouseEvent>) => {
                        setModal(!modal)
                    }}>
                        <UserCircleIcon width={36}/>
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
            <div className="z-10 w-64 h-full bg-white pb-4 overflow-y-auto border-r border-border-gray flex flex-col">
                <nav className="mt-2 flex-1 text-main-navy ">
                    {
                        MenuItem.map((menu, i) => {
                            return (
                                <div key={i}>
                                    <div key={menu.id} className="hover:bg-active-blue hover:text-gray-900 pl-4 h-10 flex items-center px-4 py-2 text-main-navy text-md font-bold">
                                    <p className="w-full">{menu.name}</p>
                                    {
                                        menu.detail.length > 0 && (
                                            open[i] ? (
                                                <div data-id={i} className="cursor-pointer" onClick={ShowDetail}><ChevronUpIcon width={16} color="rgb(156, 163, 175)"/></div>
                                            ) : (
                                                <div data-id={i} className="cursor-pointer" onClick={ShowDetail}><ChevronDownIcon width={16} color="rgb(156, 163, 175)"/></div>
                                            )
                                        )
                                    }
                                </div>
                                {
                                    menu.detail.length > 0 && open[i] && (
                                        menu.detail.map((m) => {
                                            return <div key={m.id} className="hover:bg-gray-50 hover:text-gray-900 h-9 flex items-center p-2 pl-11 text-main-navy text-sm">
                                                <a className="w-full" href={m.link}>{m.name}</a>
                                            </div>
                                        })
                                    )
                                }
                                </div>
                                
                            )
                        })
                    }
                </nav>
                <nav className="px-4 pb-4">
                    <div className="text-xs mb-2 font-bold text-gray-400">
                        연결 서비스
                    </div>
                    <div className="text-main-navy font-bold text-sm">
                        {
                            ServiceMenuItem.map((service) => {
                                return (
                                    <div key={service.id} className="h-8 flex">
                                        <a className="flex items-center w-full" href={service.link} target="_blank">
                                            <p className="flex-1">{service.name}</p>
                                            <ArrowTopRightOnSquareIcon width={20} className="text-gray-300"/>
                                        </a>
                                    </div>
                                )
                            })
                        }
                    </div>
                </nav>
            </div>
        </div>
    )
}