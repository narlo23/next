import React from "react"
import Image from "next/image"
import Link from "next/link"

export default function Header() {
    return (
        <header className="flex justify-between py-4 pl-4 bg-white shadow-sm cursor-pointer">
            <Link href={"/"}>
                <Image src="/logo.png" width={192} height={40} alt="LOGO" />
            </Link>
        </header>
    )
}