import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"
import prisma from "@repo/db/client";
// import Notification from "../../../components/Notificaion";
import { Send, QrCode, History,Banknote ,Download ,HandCoins  } from "lucide-react";

import { error, timeStamp } from "console";
import { BalanceCard } from "../../../components/BalanceCard";
import { Minitransaction } from "../../../components/Minitransaction";
import { P2pTransfer } from "../../../components/p2ptransactions";
import { Buttonhome } from "../../../components/Button";
import { Monthlyspend } from "../../../components/Monthlyspend";


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

    return transaction.map((t:any)=>({
       
        fromuser : t.fromUser.name || "",
        touser : t.toUser.name || "",
        amount : t.amount,
        timestamp : t.timestamp,
        fromUserId : t.fromUserId,
        toUserId : t.toUserId,
        mode: t.fromUserId === userId ? "send" : "receive"
    }))
    
}

async function CalculateMonthlySpend(transactions:any[]){
        const spend_amount = transactions.reduce((total, t) => {
            if(t.mode === "send"){
                return total + t.amount
            }
            return total
        }, 0)
        return spend_amount 
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
    const spend_money =  await CalculateMonthlySpend(transaction)
    return (
        <div className="w-full">

                <div className="text-3xl text-[#F5F5F5] pt-8 mb-2 font-bold ">
                    Welcome back, {name}
                </div>
                <div className="text-l text-[#F5F5F5] pt-2 mb-8  ">
                    Manage your app and transactions in one place 
                </div>

           

                <div className=" flex flex-col md:flex-row gap-6 p-5 " >

                    <div className="md:w-2/4 ">
                        <BalanceCard amount={balance.amount} locked={balance.locked}/>
                    </div>
                    <div className=" md:w-3/4 ">
                        <Monthlyspend   spend_amount={spend_money} />
                    </div>
                 


                </div>


                <div className="text-4xl text-[#F5F5F5] pt-8 mb-8 font-bold">
                    Quick Actions
                </div>
                <div className="flex flex-col md:flex-row gap-6 p-5">
                    <div className="grid grid-cols-3 gap-4 md:w-2/4 ">
                    
                        <Buttonhome path ="/p2p" text="Send Money" icon={<Send size={32}/>}/>
                        <Buttonhome  path = "/transfer" text="Withdraw Money" icon={<Banknote size={32}/>}/>
                        <Buttonhome   path ="/requestmoney" text="Request Money" icon={<HandCoins size={32}/>}/>
                        <Buttonhome path = "/transaction" text = "History" icon={<History size={32}/>}/>

                    </div>
                    <div className="md:w-3/4 text-white">
                          
                        <Minitransaction userId={Number(session?.user?.id)}  transaction={transaction} />
                   
                    </div>

                </div>

          
        </div>
           
  )

}
