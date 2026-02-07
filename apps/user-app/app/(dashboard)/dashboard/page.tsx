import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"
import prisma from "@repo/db/client";
// import Notification from "../../../components/Notificaion";
import { Send, QrCode, History, Banknote, Download, HandCoins } from "lucide-react";

import { error, timeStamp } from "console";
import { BalanceCard } from "../../../components/BalanceCard";
import { Minitransaction } from "../../../components/Minitransaction";
import { P2pTransfer } from "../../../components/p2ptransactions";
import { Buttonhome } from "../../../components/Button";
import { Monthlyspend } from "../../../components/Monthlyspend";


async function getBalance() {
    const session = await getServerSession(authOptions);

    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });

    return {

        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

async function getuserinfo() {
    const session = await getServerSession(authOptions);


    const info = await prisma.user.findFirst({
        where: {
            id: Number(session?.user?.id)
        }
    })
    return info?.name
}

async function recenttransaction() {
    const session = await getServerSession(authOptions)

    const transaction = await prisma.p2pTransfer.findMany({
        where: {
            OR: [
                { fromUserId: Number(session?.user?.id) },
                { toUserId: Number(session?.user?.id) }

            ]
        },
        include: {
            fromUser: {
                select: {
                    name: true,
                }
            },
            toUser: {
                select: {
                    name: true,
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

    return transaction.map((t: any) => ({

        fromuser: t.fromUser.name || "",
        touser: t.toUser.name || "",
        amount: t.amount,
        timestamp: t.timestamp,
        fromUserId: t.fromUserId,
        toUserId: t.toUserId,
        mode: t.fromUserId === userId ? "send" : "receive"
    }))

}

async function CalculateMonthlySpend(transactions: any[]) {
    const spend_amount = transactions.reduce((total, t) => {
        if (t.mode === "send") {
            return total + t.amount
        }
        return total
    }, 0)
    return spend_amount
}


export default async function home() {
    const session = await getServerSession(authOptions)


    if (!session?.user?.id) {
        return (
            <div>
                User Not Logged in
            </div>
        )
    }

    const balance = await getBalance()
    const transaction = await recenttransaction()
    const name = await getuserinfo()
    const spend_money = await CalculateMonthlySpend(transaction)
    return (
        <div className="w-full max-w-7xl  px-4 sm:px-6 lg:px-8">
            <div className="pt-8 mb-2">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                    Welcome back, {name}
                </h1>
                <p className="text-slate-500 text-lg mt-1">
                    Manage your app and transactions in one place
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 py-6" >
                <div className="lg:w-2/5 ">
                    <BalanceCard amount={balance.amount} locked={balance.locked} />
                </div>
                <div className="lg:w-3/5 ">
                    <Monthlyspend spend_amount={spend_money} />
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-6">
                    Quick Actions
                </h2>

                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:w-3/5">
                        <Buttonhome path="/p2p" text="Send" icon={<Send size={24} />} />
                        <Buttonhome path="/transfer" text="Withdraw" icon={<Banknote size={24} />} />
                        <Buttonhome path="/requestmoney" text="Request" icon={<HandCoins size={24} />} />
                        <Buttonhome path="/transaction" text="History" icon={<History size={24} />} />
                    </div>
                    <div className="lg:w-2/5">
                        <Minitransaction userId={Number(session?.user?.id)} transaction={transaction} />
                    </div>
                </div>
            </div>
        </div>
    )

}
