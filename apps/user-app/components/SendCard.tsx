"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/Center";
import { Textinput } from "@repo/ui/Textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import { ResultCard } from "./Transfferresult";


export function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");

    return <div className="">
       
            <Card title="Send">
                <div className="min-w-40 pt-2">
                    <Textinput placeholder={"Number"} label="Number" onChange={(value) => {
                        setNumber(value)
                    }} />
                    <Textinput placeholder={"Amount"} label="Amount" onChange={(value) => {
                        setAmount(value)
                    }} />
                    <div className="pt-4 flex justify-center">
                        <Button onClick={async () => {
                  
                        await p2pTransfer(number,Number(amount)*100)
                        }}>Send </Button>
                    </div>
                
                </div>
            </Card>
       
    </div>
}