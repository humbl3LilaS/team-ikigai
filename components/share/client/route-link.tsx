'use client';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const RouteLink = () => {
    const pathname = usePathname();
  return (
    <>
        <Link href="/" className={`${pathname === '/' ? 'text-blue-600 underline underline-offset-4' : 'text-black'}`}>
            Home
        </Link>
        <Link href="/about" className={`${pathname === '/about' ? 'text-blue-600 underline underline-offset-4' : 'text-black'}`}>
            About
        </Link>
        <Link href="/contact" className={`${pathname === '/contact' ? 'text-blue-600 underline underline-offset-4' : 'text-black'}`}>
            Contact
        </Link>
    </>
  )
}

export default RouteLink