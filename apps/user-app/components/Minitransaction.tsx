"use client"


import { useState } from "react";


export  function Minitransaction({ userId, transaction }: {userId: number, transaction: {
    fromuser : string,
    touser : string,
    fromUserId: number;
    toUserId: number;
    timestamp: Date;
    amount: number;
    mode: string;
}[] }) {
    const [nav_state, setnav_state] = useState("All");
    


   return (
        <div className="bg-white rounded-xl bg-[#ededed] p-4 max-h-96 overflow-y-auto space-y-4">

                <div className="text-black text-2xl p-2">
                Recent transactions
                </div>

            <div className="flex flex-row-4 gap-14 text-gray-700 px-4 border-b-2 border-gray-300 pb-3 ">

                <div className= {nav_state === "All" ? "font-bold text-black cursor-pointer" : " cursor-pointer"} onClick={() => setnav_state("All")}>
                    All
                </div>
                <div className={nav_state === "Sent" ? "font-bold text-black cursor-pointer" : " cursor-pointer"} onClick={() => setnav_state("Sent")}>
                    Sent 
                </div>
                <div className={nav_state === "Recieved" ? "font-bold text-black cursor-pointer" : " cursor-pointer"} onClick={() => setnav_state("Recieved")}>
                    Recieved
                </div>
                <div className={nav_state === "Pending" ? "font-bold text-black cursor-pointer" : " cursor-pointer"} onClick={() => setnav_state("Pending")}>
                    Pending 
                </div>

            </div>

                <div>
                    {nav_state==="All" ? transaction.map((transaction_item, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
                            <div className="flex items-center gap-3"> 

                                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-semibold">
                                             {transaction_item.touser.charAt(0).toUpperCase()}
                                    </div>
                            <div>
                                    <div className=" flex font-medium text-gray-900">
                                        
                                        {transaction_item.touser}
                                    </div>
                                    <div className="text-sm text-gray-500 pt-1">
                                        {new Date(transaction_item.timestamp).toLocaleString("en-IN")}
                                    </div>
                            </div>
                                
                            </div>
                            <div className={transaction_item.fromUserId === userId ? "text-red-500 font-semibold" : "text-green-500 font-semibold"}>
                                ₹{(transaction_item.amount / 100).toFixed(2)}
                            </div>
                        </div>
                    )) : nav_state === "Sent" ? transaction.filter(t => t.fromUserId === userId).map((transaction_item, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
                            <div className="flex items-center gap-3">

                                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-semibold">
                                            {transaction_item.touser.charAt(0).toUpperCase()}
                                    </div>
                                    <div> 
                                    
                                            <div className="font-medium text-gray-900">
                                            {transaction_item.touser}
                                            </div>
                                            <div className="text-sm text-gray-500 pt-1">
                                                {new Date(transaction_item.timestamp).toLocaleString("en-IN")}
                                            </div>

                                    </div>
                            </div>
                            <div className="text-red-500 font-semibold">
                                ₹{(transaction_item.amount / 100).toFixed(2)}
                            </div>
                        </div>
                    )) : nav_state === "Recieved" ? transaction.filter(t => t.toUserId === userId).map((transaction_item, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
                            <div>
                                <div className="font-medium text-gray-900">
                                   {transaction_item.touser}
                                </div>
                            
                                <div className="text-sm text-gray-500 pt-1">

                                    {new Date(transaction_item.timestamp).toLocaleString("en-IN")}
                                </div>
                            </div>
                            <div className="text-green-500 font-semibold">
                                ₹{(transaction_item.amount / 100).toFixed(2)}
                            </div>
                        </div>
                    )) : <div className="text-gray-500 p-4">No pending transactions</div>}   
                </div>

        </div>

   )
}