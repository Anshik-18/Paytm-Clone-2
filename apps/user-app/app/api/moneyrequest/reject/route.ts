import prisma from "@repo/db/client"

export async function POST (req:Request){
    const{requestid} = await req.json()

    await prisma.requestMoney.update({
        where:{
            id:requestid
        },
        data:{
            status:"Rejected"
        }
    })
    return new Response(JSON.stringify({ message: "Request rejected" }), { status: 200 });
}