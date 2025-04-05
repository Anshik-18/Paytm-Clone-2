"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";
import bcrypt from "bcrypt" 


export async function p2pTransfer(to: string, amount: number,password:string) {
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;
    if (!from) {
        return {
            message: "Error while sending"
        }
    }

    const user = await prisma.user.findFirst({
      where:{
        id:Number(from)
      }
    })
  

    if(!user){
      return {
        message:"User not found"
      }
    }

    const passwordvalid =await  bcrypt.compare(password,user.password)
    
    if(!passwordvalid){
      return {
        message: "Wrong password"
      }
    }
    
    const toUser = await prisma.user.findFirst({
        where: {
            number: to
        }
    });

    if (!toUser) {
        return {
            message: "User not found"
        }
    }

    if(Number(toUser.id)===Number(from)){
      return{
        message:"Can not process the transaction"
      }
    }
     await prisma.$transaction(async (tx) => {
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
        const fromBalance = await tx.balance.findUnique({
            where: { userId: Number(from) },
          });
          if (!fromBalance || fromBalance.amount < amount) {

     
            return{
              message:"Not enough fund"
            }
          }

          await tx.balance.update({
            where: { userId: Number(from) },
            data: { amount: { decrement: amount } },
          });

          await tx.balance.update({
            where: { userId: toUser.id },
            data: { amount: { increment: amount } },
          });

          await tx.p2pTransfer.create({
            data:{
                fromUserId : Number(from),
                toUserId : toUser.id,
                amount:amount,
                timestamp : new Date()

         
            }
          })
          await tx.notification.create({
            data:{
              fromUserId : Number(from),
              userId : toUser.id,
              amount : amount,
              timestamp : new Date()  
            }
          })
          
        
        }
      );
    
}