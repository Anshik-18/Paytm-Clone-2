"use server";
import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import { error } from "console";

export async function requestmoney(amount:number , tonumber:string){
    try{

    const session = await getServerSession(authOptions)
    const userid = session?.user?.id

    console.log(tonumber)
  
    const toUser = await prisma.user.findFirst({
        where:{
            number:String(tonumber)
        }
    })

    if (!userid) {
        return { error: "User not authenticated" };
    }

    if(!toUser){
        return {error:"USer not found "}
    }
    await  prisma.requestMoney.create({
        data:{
           fromUserId: Number(userid),
           toUserId: toUser.id,
           amount:amount,
           status:"Requested"
        }
    })

    await prisma.notification.create({
        data:{
            fromUserId: Number(userid),
            userId:   toUser.id,
            message : "Requested Money ",
            amount : amount
            
        }
    })

    return {
        message:"Request succesfully sent"
      }
    }
    catch(e){
        console.log("error is this",e)
        return { error: "Internal Server Error" }
    }

}