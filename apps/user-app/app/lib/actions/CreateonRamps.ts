"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export  async function CreteonrampsTransactions(amount:number ,provider:string){
      const session = await getServerSession(authOptions)
      const token = Math.random().toString()
      const userid = session?.user.id
      if(!userid){
        return{
            message : "user is not logged in"
        }
      }
      await prisma.onRampTransaction.create({
        data:{
            userId: Number(userid),
            amount:amount,
            status:"Processing",
            startTime: new Date(),
            provider,
            token: token
        }
      })
      return {
        message:"on ramp transaction added"
      }
}