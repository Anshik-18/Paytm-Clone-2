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
}, {
    name: "PhonePe",
    redirectUrl: ""
}
];

export const AddMoney = ({ currentbalance }: { currentbalance: number }) => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [amount, setAmount] = useState(0);
    const [provider, setprovider] = useState(SUPPORTED_BANKS[0]?.name || " ")
    const [loading, setloading] = useState(false)


    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
            <Card title={"Wallet Balance"}>
                <div className="flex justify-between items-center pb-4">

                    <div className="text-3xl font-bold text-slate-800">
                        ₹{(currentbalance / 100).toLocaleString('en-IN')}
                    </div>
                </div>

                <div className="text-sm text-slate-500 flex items-center">
                    Linked with  <Image src="/HDFC_Bank_Logo.svg.png" alt="HDFC Bank" width={100} height={20} className="inline-block h-6 object-contain ml-2" />
                </div>

            </Card>

            <div className="mt-6">
                <div className="mb-2 text-sm font-medium text-slate-700">
                    Quick Add
                </div>

                <div className="grid grid-cols-4 gap-3 mb-6">
                    {[500, 1000, 2000, 5000].map((amt) => (
                        <button
                            key={amt}
                            onClick={() => setAmount(amt)}
                            className={`py-2 px-4 rounded-lg text-sm font-medium border transition-all duration-200 ${amount === amt
                                ? "bg-slate-900 text-white border-slate-900 shadow-md shadow-blue-500/20"
                                : "bg-white text-slate-700 border-slate-200 hover:border-slate-900 hover:text-slate-900"
                                }`}
                        >
                            +{amt.toLocaleString('en-IN')}
                        </button>
                    ))}
                </div>
            </div>

            <Textinput label={"Amount"} placeholder={"Enter Custom Amount"} value={String(amount)} onChange={(value) => {
                setAmount(Number(value))

            }} />

            <div className="py-4 text-left font-medium text-slate-700">
                Select Bank
            </div>

            <Select onSelect={(value) => {
                setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
                setprovider(SUPPORTED_BANKS.find(x => x.name === value)?.name || " ")
            }} options={SUPPORTED_BANKS.map(x => ({
                key: x.name,
                value: x.name
            }))} />

            <div className="flex justify-center pt-6">
                <Button
                    variant="primary"
                    fullWidth
                    onClick={async () => {
                        if (loading) return
                        setloading(true)

                        try {

                            if (!amount || isNaN(amount) || amount <= 0) {
                                alert("Please enter a valid amount greater than zero.");
                                return;
                            }



                            await CreteonrampsTransactions(amount * 100, provider)
                            window.location.href = redirectUrl || "";

                        }
                        catch (e) {
                            console.log(e)
                            console.error("Payment error:", e);
                            alert("Something went wrong. Please try again.");

                        }
                        finally {
                            setloading(false)
                        }

                    }}>

                    {loading ? "Processing..." : "Add Money to Wallet"}
                </Button>
            </div>

        </div>
    )
}


