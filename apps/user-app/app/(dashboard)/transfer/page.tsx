import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransaction";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";



  async function getBalance() {
    const session = await getServerSession(authOptions);
   
    const  balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
  
    return {
      
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

export default async function balance() {
    const session = await getServerSession(authOptions)

    if(!session?.user?.id){
   return (
    <div className=" w-full flex flex-col items-center justify-center h-[50vh] text-center">
      <h1 className="text-2xl font-semibold mb-2">
        You're not signed in
      </h1>

      <p className="text-slate-500 mb-6 max-w-sm">
        You need to log in to access this page.  
      </p>

      <a
        href="/api/auth/signin"
        className="px-5 py-2 rounded-lg bg-black text-white hover:opacity-90 transition"
      >
        Sign In
      </a>
    </div>
  );
    }
  
    const balance = await getBalance();
   
    const transactions = await getOnRampTransactions();

    return <div className="w-screen">
        <div className="text-4xl text-[#000000] px-4 pt-8 mb-8 font-bold">
            Add Money
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <AddMoney currentbalance={balance.amount} />
            </div>
            <div>
            

                <div>
                    <OnRampTransactions transactions={transactions} />
                </div>
            </div>
        </div>
    </div>
}