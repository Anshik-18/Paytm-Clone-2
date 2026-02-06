"use client"

import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/Center";
import { Select } from "@repo/ui/Select";

import { use, useState } from "react";
import { Textinput } from "@repo/ui/Textinput";
import { CreteonrampsTransactions } from "../app/lib/actions/CreateonRamps";
import { redirect } from "next/dist/server/api-utils";
import { POST } from "../app/api/auth/[...nextauth]/route";
import { intiatiePhonePePayment } from "../app/lib/actions/InitiaitePhonePe";
import { error } from "console";
import Image from "next/image";


const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
},{
    name:"PhonePe",
    redirectUrl: ""
}
];

export const AddMoney = ({currentbalance}: {currentbalance: number}) => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const[amount,setAmount ] = useState(0);
    const[provider,setprovider] = useState(SUPPORTED_BANKS[0]?.name|| " ")
    const[loading,setloading] = useState(false)


    return(
        <div className="w-full bg-white p-6 rounded-xl">
             <Card title={"Wallet Balance"}>
                    <div className="flex justify-between  pb-2">
                     
                        <div className="text-3xl">
                            ₹{currentbalance / 100} 
                        </div>
                    </div>
            
                        <div className="text-sm text-gray-500">
                            Linked with  <Image src="/HDFC_Bank_Logo.svg.png" alt="HDFC Bank" width={100} height={20} className="inline-block h-5 ml-2"/>
                        </div>
            
                </Card>

                        <div>
                            <div className="pt-4" >
                                Enter the amount 
                            </div>

                            <div className="flex flex-row">
                                <div className="text-xl px-6 py-2 font-semibold  mr-2 mt-2 border-2  rounded-full bg-black text-white cursor-pointer " onClick={()=>setAmount(500)}>500</div>
                                <div className="text-xl px-6 py-2 font-semibold  mr-2 mt-2 border-2  rounded-full bg-black text-white cursor-pointer " onClick={()=>setAmount(1000)}>1000</div>
                                <div className="text-xl px-6 py-2 font-semibold  mr-2 mt-2 border-2  rounded-full bg-black text-white cursor-pointer " onClick={()=>setAmount(2000)}>2000</div>
                                <div className="text-xl px-6 py-2 font-semibold  mr-2 mt-2 border-2  rounded-full bg-black text-white cursor-pointer " onClick={()=>setAmount(5000)}>5000</div>
                         

                            </div>
                        </div>

                        <Textinput label={"Amount"} placeholder={"Amount"} value= {String(amount)} onChange={(value) => {
                            setAmount(Number(value))

                        }} />

                        <div className="py-4 text-left">
                            Bank
                        </div>

                        <Select onSelect={(value) => {
                            setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
                            setprovider(SUPPORTED_BANKS.find(x => x.name === value)?.name || " ")
                        }} options={SUPPORTED_BANKS.map(x => ({
                            key: x.name,
                            value: x.name
                        }))} />

                        <div className="flex justify-center pt-4">
                            <Button   onClick= {  async () => {
                                if (loading) return
                                setloading(true)
                                
                            try{ 

                                if (!amount || isNaN(amount) || amount <= 0) {
                                    alert("Please enter a valid amount greater than zero.");
                                    return;
                                }
                                
                                
                                
                                    await CreteonrampsTransactions(amount*100,provider)
                                    window.location.href = redirectUrl || "";
                            
                            }
                                catch(e){
                                    console.log(e)
                                    console.error("Payment error:", e);
                                    alert("Something went wrong. Please try again.");
                                    
                                }
                                finally{
                                    setloading(false)
                                }
                                
                            }}>
                                
                                {loading ? "Loading..." : "Add Money"}
                            </Button>
                        </div>
                    
  </div>
)
}


