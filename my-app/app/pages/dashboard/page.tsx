'use client'
import React, { useEffect, useState } from "react";

import Navbar from "@/app/components/navbar";
import MainHeader from "@/app/components/mainheader";
import { getMetaData } from "@/app/apis/data";

export default function DashBoard() {
    const url = "https://www.youtube.com/watch?v=9P6rdqiybaw"
    const [data, setData] = useState<string>()

    useEffect(() => {
        const fetchMetaData = async () => {
            const metaData = await getMetaData(url)
            setData(metaData)
        }
        fetchMetaData()
    }, [])

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <div className="h-screen w-screen bg-gray-50 flex flex-col">
            <MainHeader />
            <div className="w-full h-full flex">
                <Navbar />
            </div>
        </div>
    )
}