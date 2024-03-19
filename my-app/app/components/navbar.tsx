'use client'

import React from "react"
import { MenuItem, ServiceMenuItem } from "../constants/data"
import { useState } from "react"
import {ArrowTopRightOnSquareIcon, ChevronUpIcon, ChevronDownIcon} from "@heroicons/react/20/solid";
import Image from "next/image";

export default function Navbar() {
    const [open, setOpen] = useState(Array(MenuItem.length).fill(true))

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

    return (
        <div className="flex-1 z-10 w-64 bg-white pb-4 overflow-y-auto flex flex-col">
                <nav className="mt-2 flex-1 text-main-navy ">
                    {
                        MenuItem.map((menu:any, i:number) => {
                            return (
                                <div key={i} data-id={i} onClick={ShowDetail} className="cursor-pointer">
                                    <div key={menu.id} className="hover:bg-active-blue hover:text-gray-900 pl-4 h-10 flex items-center px-4 py-2 text-main-navy text-md font-bold">
                                    <Image src={menu.icon} width={20} height={20} className="mr-2" alt={menu.name}></Image>
                                    <p className="w-full">{menu.name}</p>
                                    {
                                        menu.detail.length > 0 && (
                                            open[i] ? (
                                                <div><ChevronUpIcon width={16} color="rgb(156, 163, 175)"/></div>
                                            ) : (
                                                <div><ChevronDownIcon width={16} color="rgb(156, 163, 175)"/></div>
                                            )
                                        )
                                    }
                                </div>
                                {
                                    menu.detail.length > 0 && open[i] && (
                                        menu.detail.map((m:any) => {
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
                            ServiceMenuItem.map((service:any) => {
                                return (
                                    <div key={service.id} className="h-8 flex">
                                        <a className="flex items-center w-full" href={service.link} target="_blank">
                                            <img src={service.icon} alt="icon" width={20}/>
                                            <p className="flex-1 ml-3">{service.name}</p>
                                            <ArrowTopRightOnSquareIcon width={20} className="text-gray-300"/>
                                        </a>
                                    </div>
                                )
                            })
                        }
                    </div>
                </nav>
            </div>
    )
}