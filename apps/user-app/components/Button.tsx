"use client";

import { useRouter } from "next/navigation";


export const Buttonhome = ({ path, text, icon }: { path: string, text: string, icon: React.ReactNode }) => {
    const router = useRouter();
    return (
        <button className="group flex flex-col items-center justify-center gap-3 w-full p-6 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:border-black/10 transition-all duration-300 active:scale-95 cursor-pointer"
            onClick={() => router.push(path)}>
            <div className="text-black group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <p className="text-sm font-semibold text-slate-600 group-hover:text-black transition-colors">{text}</p>
        </button>
    )
} 