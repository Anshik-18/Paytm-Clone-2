import prisma from "@repo/db/client";
import { p2pTransfer } from "../../../lib/actions/p2pTransfer";


export async function POST(req:Request){
    const { requestid, tonumber, amount } = await req.json();

    await prisma.requestMoney.update({
        where: { id: requestid },
        data: { status: "Accepted" },
    });

    await p2pTransfer(tonumber, amount * 100);

    return new Response(JSON.stringify({ message: "Request accepted and transferred" }), { status: 200 });

}