import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"
import prisma from "@repo/db/client";

async function getransaction (){
    
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id)
 
    const p2pTransactions = await prisma.p2pTransfer.findMany({
        where: {
          OR: [{ fromUserId: userId }, { toUserId: userId }]
        },
        orderBy: { timestamp: "desc" }
      });
      
      const withdrawals = await prisma.onRampTransaction.findMany({
        where: {
          userId,
          status : "Success"
        
        }
      });
      
      const allTransactions = [
        ...p2pTransactions.map(m => ({
          type: "P2P",
          amount: m.amount,
          timestamp: m.timestamp,
          fromUserId: m.fromUserId,
          toUserId: m.toUserId
          
        })),
        ...withdrawals.map(m => ({
          type: "Withdrawal",
          amount: m.amount,
          timestamp: m.startTime,
          fromUserId: "system"
        }))
      ];

      
      
      allTransactions.sort((a, b) => {
        const dateA = new Date(a.timestamp).getTime();
        const dateB = new Date(b.timestamp).getTime();
        return dateB - dateA; 
      });
      
    return allTransactions.map(m=>({
        type:m.type,
        amount:m.amount,
        timeStamp:m.timestamp,
        fromUserId : m.fromUserId 

    }))


}

export default async function (){
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id)

    if(!session?.user?.id){
      return (
        <div className="  text-4xl font-bold ">
          Uses not logged in
        </div>
        
      )
    }

    const transaction = await getransaction()

    if(transaction.length == 0){
      return(
        <div className="text-3xl font-bold">
          No recent transactions 
        </div>
      )
    }

    
    return (
        <div className="w-full">
                <div className="text-4xl text-[#6a51a6] font-bold mb-[30px] ">
                    Transactions 
                </div>

       {transaction.map((m, i) => {
  const isSent = m.fromUserId === userId;
  const label =
    m.type === "Withdrawal"
      ? "Withdrawal"
      : isSent
      ? "Money Sent"
      : "Money Received";

  const amountColor =
    m.type === "Withdrawal"
      ? "text-orange-400"
      : isSent
      ? "text-red-400"
      : "text-emerald-400";

  const formattedTime = new Date(m.timeStamp).toLocaleString();

  return (
    <div
      key={i}
      className="
        bg-[#121826]
        border border-white/10
        rounded-xl
        p-5
        mb-4
        flex justify-between items-center
        hover:bg-[#1a2236]
        transition
      "
    >
      {/* LEFT SIDE */}
      <div className="flex items-center gap-4">

        {/* Direction Icon */}
        <div
          className={`
            w-10 h-10 flex items-center justify-center
            rounded-lg
            ${isSent ? "bg-red-500/10" : "bg-emerald-500/10"}
          `}
        >
          {isSent ? "↗" : "↙"}
        </div>

        {/* Info */}
        <div>
          <div className="text-lg font-semibold text-white">
            {label}
          </div>

          <div className="text-sm text-slate-400">
            {formattedTime}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className={`text-lg font-semibold ${amountColor}`}>
        {isSent ? "-" : "+"} ₹{m.amount / 100}
      </div>
    </div>
  );
})}

        </div>
      )
    }