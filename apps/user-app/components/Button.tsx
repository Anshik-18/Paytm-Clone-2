"use client";

import { useRouter } from "next/navigation";


export  const  Buttonhome =({path,text}:{ path: string  ,text:string})=>{
    const router = useRouter();
    return (
        <button  onClick = {() => router.push(path)} className="bg-[#6a51a6]  text-xl text-white font-bold  py-8 px-6 cursor-pointer rounded-lg  hover:bg-[#5a4296] transition">
            {text}
        </button>

    )
} 