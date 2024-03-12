import React from "react";

import Navbar from "@/app/components/navbar";
import MainHeader from "@/app/components/mainheader";

export default function DashBoard() {
    return (
        <div className="h-screen w-screen bg-gray-50 flex flex-col">
            <MainHeader />
            <Navbar />
        </div>
    )
}