"use client"

import { Card } from "@repo/ui/card";
import { useState } from "react";





export const Request = ({fromUserId,amount,touserid,status,name,number,requestid,tonumber }:{ fromUserId: number , amount:number, touserid:number,status:string,name:string,number:string,requestid:number,tonumber:string })=>{

    const [requestStatus, setRequestStatus] = useState(status);

    async function  rejecthandle(requestid:number){
        await fetch("/api/moneyrequest/reject", {
            method: "POST",
            body: JSON.stringify({ requestid }),
            headers: { "Content-Type": "application/json" },
        });
        setRequestStatus("Rejected");
    }


    async function  accepthandle(requestid:number,tonumber:string,amount:number){
        await fetch("/api/moneyrequest/accept",{
            method:"POST",
            body: JSON.stringify({ requestid, tonumber, amount }),
            headers: { "Content-Type": "application/json" },
        })
        setRequestStatus("Accepted");
    }

   return ( 
    <Card title="Moneyrequests" >

            <div className="border-black-900 pt-4" >

                <div className="gap-y-2">

                    <div className=" text-l ">
                        <p> From:{name}</p>
                    </div>

                    <div className=" text-l">
                        <p> Amount:{amount}</p>
                    </div>

                </div>
                <div className="flex gap-x-6 pt-2">
                    <button  className="bg-gray-800 text-white px-4  py-2 rounded-lg" onClick={() => rejecthandle(requestid)}>
                            Reject
                        </button>

                    <button  className="bg-gray-800 text-white px-4  py-2 rounded-lg" onClick={()=>accepthandle(requestid,tonumber,amount)}>
                        Accept
                    </button>
                </div>


            </div>
            {requestStatus === "Accepted" && (
                    <div className="text-green-600 font-bold text-lg">
                        ✅ Request Accepted
                    </div>
                )}

                {requestStatus === "Rejected" && (
                    <div className="text-red-600 font-bold text-lg">
                        ❌ Request Rejected
                    </div>
                )}
         </Card>
        )
    
}