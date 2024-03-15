import React, { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"

type HeaderProps = {
    pad?: string,
    children?: React.ReactNode,
}   

export default function Header({pad, children}:HeaderProps) {
    return (
        <header className={`flex items-center justify-between py-4 ${pad} bg-white shadow-sm border-b border-border-gray`} >
            <Link href={"/pages/dashboard"}>
                <Image src="/assets/logo.png" width={192} height={40} alt="LOGO" className="cursor-pointer"/>
            </Link>
            {children}
        </header>
    )
}