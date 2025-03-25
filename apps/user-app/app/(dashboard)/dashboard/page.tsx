import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"
import prisma from "@repo/db/client";
// import Notification from "../../../components/Notificaion";
import { getBalance } from "../transfer/page";
import { error, timeStamp } from "console";
import { BalanceCard } from "../../../components/BalanceCard";
import { Minitransaction } from "../../../components/Minitransaction";
import { P2pTransfer } from "../../../components/p2ptransactions";
import { Buttonhome } from "../../../components/Button";


async function recenttransaction(){
    const session =  await getServerSession(authOptions)
 
    const transaction  = await prisma.p2pTransfer.findMany({
        where:{
            OR:[
               { fromUserId : Number(session?.user?.id)}, 
               { toUserId :  Number(session?.user?.id)}

            ]
        },
        orderBy: {
            timestamp: "desc" 
        },
        take: 5
    })
    const userId = Number(session?.user?.id)
    
    return transaction.map(t=>({
       
        amount : t.amount,
        timestamp : t.timestamp,
        fromUserId : t.fromUserId,
        toUserId : t.toUserId,
        mode: t.fromUserId === userId ? "send" : "receive"
    }))
    
}

export default  async function home() {
    const session = await getServerSession(authOptions)


    if(!session?.user?.id){
        return(
            <div>
                User Not Logged in
            </div>
        )
    }

    const balance   = await  getBalance()
    const transaction =  await recenttransaction()
    return (
        <div>

                <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                    Transfer
                </div>

                <div className=" flex gap-x-10" >

                    <div className="w-[400px] ">
                        <BalanceCard amount={balance.amount} locked={balance.locked}/>
                    </div>

                    <div className="w-[700px] h-[200px] overflow-y-auto ">
                        <Minitransaction   transaction={transaction} />
                    </div>

                </div>

                <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                    Quick Actions
                </div>

                <div className="flex gap-x-10 ">
                    <Buttonhome path ="/p2p" text="Send Money"/>
                    <Buttonhome  path = "/transfer" text="Withdraw Money"/>
                    <Buttonhome   path ="/" text="Request Money"/>

                </div>
          
        </div>
           
  )

}
