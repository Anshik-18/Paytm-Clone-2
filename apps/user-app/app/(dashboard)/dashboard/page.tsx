import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"
import prisma from "@repo/db/client";
// import Notification from "../../../components/Notificaion";

import { error, timeStamp } from "console";
import { BalanceCard } from "../../../components/BalanceCard";
import { Minitransaction } from "../../../components/Minitransaction";
import { P2pTransfer } from "../../../components/p2ptransactions";
import { Buttonhome } from "../../../components/Button";


async function getBalance() {
    const session = await getServerSession(authOptions);
   
    const  balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
  
    return {
      
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

async function getuserinfo(){
    const session = await getServerSession(authOptions);


    const info = await prisma.user.findFirst({
        where:{
            id: Number(session?.user?.id)
        }
    })
    return info?.name
}

async function recenttransaction(){
    const session =  await getServerSession(authOptions)
 
    const transaction  = await prisma.p2pTransfer.findMany({
        where:{
            OR:[
               { fromUserId : Number(session?.user?.id)}, 
               { toUserId :  Number(session?.user?.id)}

            ]
        },
        include:{
            fromUser:{
                select:{
                    name:true,
                }
            },
            toUser:{
                select:{
                    name:true,
                }
            }

        },
        orderBy: {  
            timestamp: "desc" 
        },
        take: 5
    })
    const userId = Number(session?.user?.id)
    // @ts-ignore

    return transaction.map(t=>({
       
        fromuser : t.fromUser.name || "",
        touser : t.toUser.name || "",
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
    const name = await getuserinfo()
    return (
        <div className="w-full">

                <div className="text-3xl text-[#6a51a6] pt-8 mb-8 font-bold">
                    Welcome {name}
                </div>

                <div className="text-4xl text-[#6a51a6] pt-3 mb-8 font-bold">
                    Transfer
                </div>

                <div className=" w-full grid grid-cols-1 gap-6 md:grid-cols-2  flex p-5 " >

                    <div className=" ">
                        <BalanceCard amount={balance.amount} locked={balance.locked}/>
                    </div>

                    <div className="h-[200px] overflow-y-auto ">
                        <Minitransaction   transaction={transaction} />
                    </div>

                </div>

                <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                    Quick Actions
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 flex ">
                
                    <Buttonhome path ="/p2p" text="Send Money"/>
                    <Buttonhome  path = "/transfer" text="Withdraw Money"/>
                    <Buttonhome   path ="/requestmoney" text="Request Money"/>
                    <Buttonhome path = "/transaction" text = "Transactions"/>

                </div>
          
        </div>
           
  )

}
