"use client";
import { Card } from "@repo/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";


export const BalanceCard = ({ amount, locked }: {
    amount: number;
    locked: number;
}) => {
    const router = useRouter();
    return <Card title={"Wallet Balance"}>
        <div className="flex justify-between items-center pb-4">
            <div className="text-3xl font-bold text-slate-800">
                ₹{(amount / 100).toLocaleString('en-IN')}
            </div>
        </div>

        <div className="text-sm text-slate-500 flex items-center mb-6">
            Linked with  <Image src="/HDFC_Bank_Logo.svg.png" alt="HDFC Bank" width={100} height={20} className="inline-block h-6 ml-2 object-contain" />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="py-2.5 px-4 bg-slate-900 text-white rounded-lg cursor-pointer hover:bg-slate-800 transition-colors text-center font-medium shadow-md shadow-blue-500/20" onClick={()=>{ 
                router.push("/transfer")

            }}>
                Add money
            </div>
            <div className="py-2.5 px-4 bg-white border border-slate-900 text-slate-900 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors text-center font-medium" onClick={()=>{
                router.push("/transfer")
            }}>
                Withdraw
            </div>
        </div>
    </Card>
}