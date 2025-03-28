import { getServerSession } from "next-auth";
import { SendCard } from "../../../components/SendCard";
import { authOptions } from "../../lib/auth";
import { P2pTransfer } from "../../../components/p2ptransactions";
import prisma from "@repo/db/client";

export async function recievedtransactions(){
    const session = await getServerSession(authOptions);
    const recived = await prisma.p2pTransfer.findMany({
        where:{
            toUserId : Number(session?.user?.id)
        },
        include: {
            fromUser: {
              select: {
                name: true, 
              },
            },
            toUser: {
              select: {
                name: true, 
              },
            },
          }
    })
    return recived.map(r =>({
        fromUserId : r.fromUserId,
        toUserId : r.toUserId,
        timestamp  : r.timestamp,
        amount : r.amount,
        fromname : r.fromUser.name || "",
        toname  : r.toUser.name || ""
    }))

}
export async function sendtransactions(){
    const session = await getServerSession(authOptions);
    const send = await prisma.p2pTransfer.findMany({
        where:{
            fromUserId : Number(session?.user?.id)
        },
        include: {
            fromUser: {
              select: {
                name: true, 
              },
            },
            toUser: {
              select: {
                name: true, 
              },
            },
          }
    })
    return send.map(r =>({
        fromUserId : r.fromUserId,
        toUserId : r.toUserId,
        timestamp  : r.timestamp,
        amount : r.amount,
        fromname : r.fromUser.name || "",
        toname  : r.toUser.name || ""
    }))

}



export default async function () {
    const session = await getServerSession(authOptions)
    if(!session?.user?.id){
        return(
            <div>
                User Not Logged in
            </div>
        )
    }

    const recieved = await recievedtransactions();
    const send = await sendtransactions();

    return (
        <div className="w-screen ">
           
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                Trasnfer money
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 items-start ">
              
                 <SendCard />
              
                    <div >
                        <P2pTransfer mode="received" recieve={recieved} />
                      <div className="pt-4">
                          <P2pTransfer mode="send" recieve={send} />
                        </div>
                    </div>

            </div>
          
        </div>
    );
}
