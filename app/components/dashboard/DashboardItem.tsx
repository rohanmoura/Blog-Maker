"use client"

import { navLinks } from '@/app/dashboard/layout';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

const DashboardItem = () => {

    const pathname = usePathname();

    return (
        <>
            {navLinks.map((items) => (
                <Link href={items.href} key={items.name} className={cn(pathname === items.href ? "bg-muted text-primary" : "text-muted-foreground bg-none", "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary/70")}>
                    <items.icon className='size-4' />
                    {items.name}
                </Link>
            ))}
        </>
    )
}

export default DashboardItem
