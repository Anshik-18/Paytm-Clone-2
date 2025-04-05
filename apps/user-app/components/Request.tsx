"use client"

import { Card } from "@repo/ui/card";
import { useState } from "react";





export const Request = ({fromUserId,amount,touserid,status,name,number,requestid,tonumber }:{ fromUserId: number , amount:number, touserid:number,status:string,name:string,number:string,requestid:number,tonumber:string })=>{

    const [requestStatus, setRequestStatus] = useState(status);
    const[password,setpassword] = useState("")
    const[passwordfield, setpasswordfield] = useState(false)

    async function  rejecthandle(requestid:number){
        await fetch("/api/moneyrequest/reject", {
            method: "POST",
            body: JSON.stringify({ requestid }),
            headers: { "Content-Type": "application/json" },
        });
        setRequestStatus("Rejected");
    }


    async function  accepthandle(requestid:number,tonumber:string,amount:number,password:string){
       
         const result = await fetch("/api/moneyrequest/accept",{
            method:"POST",
            body: JSON.stringify({ requestid, tonumber, amount,password }),
            headers: { "Content-Type": "application/json" },
        })
        const {message} =  await result.json()
        console.log(message)
      
        setRequestStatus(message)
    }

   return ( 
    
        <div className="border  mt-2 p-4 bg-white rounded-xl bg-[#ededed] ">


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

                    <button  className="bg-gray-800 text-white px-4  py-2 rounded-lg" onClick={()=>{
                        setpasswordfield(true)
                    }}>
                        Accept
                    </button>
                    
                </div>
                
                        {passwordfield==true?(
                            <div>
                                <label className="block my-2 text-sm font-medium text-gray-900">Password</label>
                                <input placeholder={"Passowrd"} type="Password" onChange={(e)=>{setpassword(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

                                <button  className="bg-gray-800 text-white  mt-3 px-4  py-2 rounded-lg" onClick={()=>accepthandle(requestid,tonumber,amount,password)}>
                                      Send Money
                                </button>
                            </div>
                        ):(
                            <div>
                            </div>
                        )}

                    


            </div>
            {requestStatus === "Accepted" && (
                <div className="text-green-600 font-bold text-lg">
                        ✅ Request Accepted
                    </div>
                )}
                    {requestStatus === "Wrong password" && (
                    <div className="text-red-600 font-bold text-md">
                        ❌ Wrong password. Please try again.
                    </div>
                )}

                {requestStatus === "Rejected" && (
                    <div className="text-red-600 font-bold text-lg">
                         Request Rejected
                    </div>
                )}
                {requestStatus === "Not possible" && (
                    <div className="text-red-600 font-bold text-lg">
                         Can not process already processed request
                    </div>
                )}
      
            </div>
        )
    
}