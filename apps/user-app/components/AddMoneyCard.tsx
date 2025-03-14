"use client"

import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/Center";
import { Select } from "@repo/ui/Select";

import { use, useState } from "react";
import { Textinput } from "@repo/ui/Textinput";
import { CreteonrampsTransactions } from "../app/lib/actions/CreateonRamps";


const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const[amount,setAmount ] = useState(0);
    const[provider,setprovider] = useState(SUPPORTED_BANKS[0]?.name|| " ")
    return <Card title="Add Money">
    <div className="w-full">
        <Textinput label={"Amount"} placeholder={"Amount"} onChange={(value) => {
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
            <Button onClick={async () => {
                await CreteonrampsTransactions(amount*100,provider)
                window.location.href = redirectUrl || "";
            }}>
            Add Money
            </Button>
        </div>
    </div>
</Card>
}


