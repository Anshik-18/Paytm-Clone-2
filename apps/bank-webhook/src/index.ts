import express from "express";
import db from "@repo/db/client";
import prisma from "@repo/db/client";
const app = express();

app.use(express.json())

app.post("/hdfcWebhook", async (req, res) => {
  
    const paymentInformation: {
        token: string;
        userId: string;
        amount: string
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };

    try {
       const trans = await  prisma.onRampTransaction.findUnique({
            where:{
                token:req.body.token
            }
        })
        if (!trans) {
            return res.status(411).json({ message: "Invalid transaction token" });
        }
        
        if(trans?.status!="Processing"){
        return res.status(411).json({
                message: "Can not process already processed transaction "
            })
        }
        if( Number(paymentInformation.userId) != trans?.userId || trans.amount!=Number(paymentInformation.amount)) { 
            await  db.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                }, 
                data: {
                    status: "Failure",
                }
            })
    
            return res.status(411).json({
                message: "Something went wrong "
            })


        }
        await db.$transaction([
        db.balance.updateMany({
            where: {
                userId: Number(paymentInformation.userId)
            },
            data: {
                amount: {
                   
                    increment: Number(paymentInformation.amount)
                }
            }
        }),
        db.onRampTransaction.updateMany({
            where: {
                token: paymentInformation.token
            }, 
            data: {
                status: "Success",
            }
        })
    ]);

     return res.json({
        message: "Captured"
    })



    
    } catch(e) {
        console.error(e);
        return res.status(411).json({
            message: "Error while processing webhook"
        })
    }

})
    
app.listen(3003);