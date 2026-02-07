"use client"
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const SidebarItem = ({ href, title, icon }: { href: string; title: string; icon: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname()
    const selected = pathname === href

    return <div className={`flex ${selected ? "text-blue-600 font-bold border-l-4 border-blue-600 bg-blue-50" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"} cursor-pointer p-3 pl-8 transition-all duration-200`} onClick={() => {
        router.push(href);
    }}>
        <div className="pr-2">
            {icon}
        </div>
        <div className={`font-bold ${selected ? "text-blue-600" : "text-slate-500"}`}>
            {title}
        </div>
    </div>
}