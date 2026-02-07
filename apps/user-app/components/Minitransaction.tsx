"use client"


import { useState } from "react";


export function Minitransaction({ userId, transaction }: {
    userId: number, transaction: {
        fromuser: string,
        touser: string,
        fromUserId: number;
        toUserId: number;
        timestamp: Date;
        amount: number;
        mode: string;
    }[]
}) {
    const [nav_state, setnav_state] = useState("All");



    return (
        <div className="bg-white rounded-xl border border-slate-100 shadow-md p-6 max-h-[500px] overflow-hidden flex flex-col">
            <div className="text-slate-900 text-xl font-bold mb-4 border-b border-slate-100 pb-2">
                Recent Transactions
            </div>

            <div className="flex gap-4 mb-4 text-sm font-medium text-slate-500 border-b border-slate-100">
                <div className={`pb-2 cursor-pointer transition-colors ${nav_state === "All" ? "text-blue-600 border-b-2 border-blue-600" : "hover:text-slate-900"}`} onClick={() => setnav_state("All")}>Overview</div>
                <div className={`pb-2 cursor-pointer transition-colors ${nav_state === "Sent" ? "text-blue-600 border-b-2 border-blue-600" : "hover:text-slate-900"}`} onClick={() => setnav_state("Sent")}>Sent</div>
                <div className={`pb-2 cursor-pointer transition-colors ${nav_state === "Recieved" ? "text-blue-600 border-b-2 border-blue-600" : "hover:text-slate-900"}`} onClick={() => setnav_state("Recieved")}>Received</div>
                <div className={`pb-2 cursor-pointer transition-colors ${nav_state === "Pending" ? "text-blue-600 border-b-2 border-blue-600" : "hover:text-slate-900"}`} onClick={() => setnav_state("Pending")}>Pending</div>
            </div>

            <div className="overflow-y-auto pr-2 custom-scrollbar space-y-3">
                {nav_state === "All" ? transaction.map((transaction_item, index) => (
                    <TransactionRow key={index} item={transaction_item} userId={userId} />
                )) : nav_state === "Sent" ? transaction.filter(t => t.fromUserId === userId).map((transaction_item, index) => (
                    <TransactionRow key={index} item={transaction_item} userId={userId} />
                )) : nav_state === "Recieved" ? transaction.filter(t => t.toUserId === userId).map((transaction_item, index) => (
                    <TransactionRow key={index} item={transaction_item} userId={userId} />
                )) : <div className="text-slate-500 py-8 text-center bg-slate-50 rounded-lg">No pending transactions</div>}
            </div>
        </div>
    )
}

function TransactionRow({ item, userId }: { item: any, userId: number }) {
    const isSender = item.fromUserId === userId;
    return (
        <div className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100">
            <div className="flex items-center gap-4">
                <div className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-sm ${isSender ? "bg-slate-100 text-slate-600" : "bg-blue-100 text-blue-700"}`}>
                    {item.touser.charAt(0).toUpperCase()}
                </div>
                <div>
                    <div className="font-semibold text-slate-800">
                        {item.touser}
                    </div>
                    <div className="text-xs text-slate-400">
                        {new Date(item.timestamp).toLocaleDateString("en-IN", { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </div>
                </div>
            </div>
            <div className={`font-bold ${isSender ? "text-slate-900" : "text-emerald-600"}`}>
                {isSender ? "-" : "+"}₹{(item.amount / 100).toLocaleString('en-IN')}
            </div>
        </div>
    )
}

