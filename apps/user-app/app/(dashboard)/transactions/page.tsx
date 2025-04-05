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

          {transaction.map(m => (
            <div className="w-full flex">
                <div className=" pt-[5px] w-full ">
                    <div className="w-full bg-white py-2 pl-4 rounded-md"> 
                        <div className="flex justify-between"> 
                            <div className="text-xl">
                                {m.fromUserId==userId?"Sent":m.type=="Withdrawal"?"Withdrawl":"Recieved"}
                            </div>   
                            <div className=" text-lg text-green-600 pr-[70px]">         
                                    ₹{m.amount/100}
                            </div>
                        </div>
                        <div className="pt-[5px] text-gray-500">
                            {String(m.timeStamp)}
                        </div>
                    </div>
                </div>            
            </div>
          ))}
        </div>
      )
    }