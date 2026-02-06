"use client";

import { useRouter } from "next/navigation";


export  const  Buttonhome =({path,text,icon}:{ path: string  ,text:string,icon:React.ReactNode})=>{
    const router = useRouter();
    return (
        <button  onClick = {() => router.push(path)} className=" flex flex-col items-center justify-center
        gap-2
        w-full
        rounded-2xl
        bg-gradient-to-b from-white to-gray-100
        shadow-sm
        border
        transition-transform duration-200
        hover:scale-105 hover:shadow-md
        transition-all
        py-5">
            <div className="text-3xl text-indigo-500">{icon}</div>

           <p className="text-sm font-medium text-gray-700">{text}</p>
        </button>

    )
} 