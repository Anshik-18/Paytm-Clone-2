import prisma from "@repo/db/client";
import { p2pTransfer } from "../../../lib/actions/p2pTransfer";


export async function POST(req:Request){
    const { requestid, tonumber, amount,password } = await req.json();
     const request = await prisma.requestMoney.findFirst({
        where:{
            id:requestid
        }
    })
    if(request?.status!="Requested"){
        return new Response(JSON.stringify({ message: "Not possible" }), { status: 200 });

    }

 

    console.log("hi",tonumber)
     const result = await p2pTransfer(tonumber, amount * 100,password);

     if(!result?.message){
        await prisma.requestMoney.update({
            where: { id: requestid },
            data: { status: "Accepted" },
        });
        return new Response(JSON.stringify({ message: "Accepted" }), { status: 200 });
     }
     

    return new Response(JSON.stringify({ message: result?.message }), { status: 200 });

}