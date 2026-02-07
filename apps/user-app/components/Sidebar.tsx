"use client";
import { SidebarItem } from "./SidebarItem";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <>
            {/* Mobile Toggle Button */}
            <div className="md:hidden fixed top-3.5 left-6 z-50">
                <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900 focus:outline-none bg-white/50 p-1 rounded-md">
                    <MenuIcon />
                </button>
            </div>

            {/* Desktop Sidebar (unchanged) */}
            <div className="hidden md:block w-72 border-r border-slate-100 min-h-screen mr-4 pt-28">
                <SidebarContent />
            </div>

            {/* Mobile Sidebar (drawer) */}
            <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-100 transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="p-4 pt-28 h-full overflow-y-auto">
                    <SidebarContent />
                </div>
                {/* Close button inside sidebar if needed, or rely on clicking outside */}
                <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-slate-500 hover:text-slate-900">
                    <CloseIcon />
                </button>
            </div>

            {/* Backdrop */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/20 z-40 md:hidden backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
            )}
        </>
    );
};

function SidebarContent() {
    return (
        <div>
            <SidebarItem href={"/dashboard"} icon={<HomeIcon />} title="Home" />
            <SidebarItem href={"/transfer"} icon={<TransferIcon />} title="Add Money" />
            <SidebarItem href={"/transactions"} icon={<TransactionsIcon />} title="History" />
            <SidebarItem href={"/p2p"} icon={<P2PTransferIcon />} title="Transfer" />
        </div>
    );
}

// Icons
function HomeIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
}
function TransferIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
}
function TransactionsIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
}
function P2PTransferIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
    </svg>
}

function MenuIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
    );
}

function CloseIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    );
}
