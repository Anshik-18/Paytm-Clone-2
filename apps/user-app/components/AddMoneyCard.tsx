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

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const[amount,setAmount ] = useState(0);
    const[provider,setprovider] = useState(SUPPORTED_BANKS[0]?.name|| " ")
    const[loading,setloading] = useState(false)


    return <Card title="Add Money">

    <div className="w-full">

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
</Card>
}


