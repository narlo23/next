import React, { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"

type HeaderProps = {
    children?: React.ReactNode,
}   

export default function Header({children}:HeaderProps) {
    return (
        <header className="flex justify-between py-4 pl-4 bg-white shadow-sm cursor-pointer" >
            <Link href={"/"}>
                <Image src="/logo.png" width={192} height={40} alt="LOGO" />
            </Link>
            {children}
        </header>
    )
}