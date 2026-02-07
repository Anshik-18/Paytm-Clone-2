"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/Center";
import { Textinput } from "@repo/ui/Textinput";
import { use, useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import { ResultCard } from "./Transfferresult";


export function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [password, setpassword] = useState("")
    const [error, seterror] = useState("")


    return <div className="">

        <Card title="Send Money">
            <div className="min-w-72 pt-4 px-2">
                <Textinput placeholder={"Number"} label="Number" value={number} onChange={(value) => {
                    setNumber(value)
                }} />
                <Textinput placeholder={"Amount"} label="Amount" value={amount} onChange={(value) => {
                    setAmount(value)
                }} />

                <div className="pt-2">
                    <label className="block mb-2 text-sm font-medium text-slate-700">Password</label>
                    <input
                        placeholder={"Password"}
                        type="password"
                        onChange={(e) => { setpassword(e.target.value) }}
                        className="bg-white border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5 transition-all outline-none shadow-sm hover:border-blue-300"
                    />
                </div>

                <div className="pt-6 flex justify-center">
                    <Button
                        variant="primary"
                        fullWidth
                        onClick={async () => {
                            seterror("")

                            const res = await p2pTransfer(number, Number(amount) * 100, password) || { message: "Success" }
                            if (res.message === "Success") {
                                window.location.reload();

                            }
                            else {
                                if (res.message) {

                                    seterror(res.message)
                                }
                                else {
                                    seterror("Can not process")
                                }
                            }
                        }}>Send Money </Button>


                </div>
                <div>
                    {error != "" ? (
                        <div className="font-semibold text-red-600 mt-4 text-center bg-red-50 p-2 rounded-md border border-red-200" >
                            {error}
                        </div>
                    ) : (null)}

                </div>

            </div>
        </Card>

    </div>
}