
import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"
import { useState } from "react"
import { Requestcard } from "../../../components/RequestmoneyCard"
import prisma from "@repo/db/client"
import { p2pTransfer } from "../../lib/actions/p2pTransfer"
import { Request } from "../../../components/Request"
import { Card } from "@repo/ui/card"

 async function getrequests(){
    const session = await getServerSession(authOptions)
    const userid = session?.user?.id
    if(!userid){
        return []
    }

    const request = await prisma.requestMoney.findMany({
        where:{
            toUserId: Number(userid),
            status:"Requested"
        },
        include:{
            fromUser:true,
            toUser:true
        }
    })

    return request.map((r)=>({
        fromUserId : r.fromUserId,
        amount : r.amount,
        touserid : r.toUserId,
        status : r.status,
        name : r.fromUser.name,
        number : r.toUser.number,
        requestid : r.id,
        tonumber : r.fromUser.number

    }))


}



export default  async function request(){
    const requests = await getrequests()   


    return (
        
            <div className="grid grid-cols-2 gap-4 w-full p-4">
                <div>
                    <Requestcard/>

                </div>


                <Card title="Money requests">

                {requests.length==0 ?( 
                  
                    <div className="font-black-900 font-bold text-xl  p-5">
                        No requests 
                    </div> 
               
                    ) 
                    :(
                        
                        
                        requests.map((r)=>(
                            <Request fromUserId={r.fromUserId} amount={r.amount} touserid={r.touserid} status={r.status} name={r.name} number={r.number} requestid={r.requestid} tonumber={r.tonumber} />
                        ))

                    ) }

                    </Card>

            </div>

        
    )
}