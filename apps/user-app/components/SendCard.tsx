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
    const [password,setpassword] = useState("")
    const[error,seterror] = useState("")


    return <div className="">
       
            <Card title="Send">
                <div className="min-w-40 pt-2">
                    <Textinput placeholder={"Number"} label="Number"  value= {number} onChange={(value) => {
                        setNumber(value)
                    }} />
                    <Textinput placeholder={"Amount"} label="Amount" value={amount} onChange={(value) => {
                        setAmount(value)
                    }} />
                    
                    <label className="block my-2 text-sm font-medium text-gray-900">Password</label>
                    <input placeholder={"Passowrd"} type="Password" onChange={(e)=>{setpassword(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

                    <div className="pt-4 flex justify-center">
                        <Button onClick={async () => {
                         seterror("")
                        
                       const res =  await p2pTransfer(number,Number(amount)*100,password) || {message:"Success"}
                       if (res.message === "Success" ) {
                        window.location.reload(); 
                         
                    }
                    else{
                        if(res.message){

                            seterror(res.message)
                        }
                        else{
                            seterror("Can not process")
                        }
                    }
                        }}>Send </Button>


                    </div>
                    <div>
                            {error!=""?(
                                <div className="font-bold text-red-800 " >
                                    {error}
                                    </div>
                            ):( <div>
                                </div>)}

                    </div>
                
                </div>
            </Card>
       
    </div>
}