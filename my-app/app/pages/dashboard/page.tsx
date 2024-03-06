"use client"

import Header from "@/app/components/header";
import React from "react";
import { Button } from "@mui/material";

export default function DashBoard() {
    return (
        <div className="h-screen w-screen bg-gray-50 flex flex-col">
            <Header>
                <Button type="button" variant="contained">
                    <div>
                        사용가이드
                    </div>
                </Button>
            </Header>
        </div>
    )
}