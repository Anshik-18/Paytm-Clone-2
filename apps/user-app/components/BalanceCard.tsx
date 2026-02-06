import { Card } from "@repo/ui/card";
import Image from "next/image";

export const BalanceCard = ({amount, locked}: {
    amount: number;
    locked: number;
}) => {
    return <Card title={"Wallet Balance"}>
        <div className="flex justify-between  pb-2">
         
            <div className="text-3xl">
                ₹{amount / 100} 
            </div>
        </div>

            <div className="text-sm text-gray-500">
                Linked with  <Image src="/HDFC_Bank_Logo.svg.png" alt="HDFC Bank" width={100} height={20} className="inline-block h-5 ml-2"/>
            </div>


            <div className="flex mt-2">
                <div className="py-2 px-14 bg-gray-400 rounded-lg mt-2 cursor-pointer">
                    Add money
                </div>
                <div className="py-2 px-12 bg-gray-400 rounded-lg mt-2 ml-4 cursor-pointer ">
                    Withdraw money
                </div>
             
                
            </div>

    </Card>
}