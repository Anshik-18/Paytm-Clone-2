import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"
import prisma from "@repo/db/client";

async function getransaction() {

  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id)

  const p2pTransactions = await prisma.p2pTransfer.findMany({
    where: {
      OR: [{ fromUserId: userId }, { toUserId: userId }]
    },
    orderBy: { timestamp: "desc" }
  });

  const withdrawals = await prisma.onRampTransaction.findMany({
    where: {
      userId,
      status: "Success"

    }
  });

  const allTransactions = [
    ...p2pTransactions.map(m => ({
      type: "P2P",
      amount: m.amount,
      timestamp: m.timestamp,
      fromUserId: m.fromUserId,
      toUserId: m.toUserId

    })),
    ...withdrawals.map(m => ({
      type: "Withdrawal",
      amount: m.amount,
      timestamp: m.startTime,
      fromUserId: "system"
    }))
  ];



  allTransactions.sort((a, b) => {
    const dateA = new Date(a.timestamp).getTime();
    const dateB = new Date(b.timestamp).getTime();
    return dateB - dateA;
  });

  return allTransactions.map(m => ({
    type: m.type,
    amount: m.amount,
    timeStamp: m.timestamp,
    fromUserId: m.fromUserId

  }))


}

export default async function () {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id)

  if (!session?.user?.id) {
    return (
      <div className="  text-4xl font-bold ">
        Uses not logged in
      </div>

    )
  }

  const transaction = await getransaction()

  if (transaction.length == 0) {
    return (
      <div className="text-3xl font-bold">
        No recent transactions
      </div>
    )
  }


  return (
    <div className="w-full pr-8 mx-auto pt-8 px-4">
      <div className="text-4xl text-slate-900 font-bold mb-[30px] tracking-tight">
        Transactions
      </div>

      <div className="space-y-4">
        {transaction.map((m, i) => {
          const isSent = m.fromUserId === userId;
          const label =
            m.type === "Withdrawal"
              ? "Withdrawal"
              : isSent
                ? "Money Sent"
                : "Money Received";

          const amountColor =
            m.type === "Withdrawal"
              ? "text-slate-900"
              : isSent
                ? "text-slate-900"
                : "text-emerald-600";

          const formattedTime = new Date(m.timeStamp).toLocaleDateString("en-IN", {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });

          return (
            <div
              key={i}
              className="
        bg-white border border-slate-100 rounded-xl p-5 flex justify-between items-center hover:shadow-md hover:border-blue-200 transition-all duration-200">
           
              <div className="flex items-center gap-4">

                <div
                  className={`
            w-12 h-12 flex items-center justify-center
            rounded-full
            ${isSent || m.type === "Withdrawal" ? "bg-slate-100 text-slate-600" : "bg-blue-100 text-blue-600"}
          `}
                >
                  {m.type === "Withdrawal" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  ) : isSent ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5 19.5 4.5m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 4.5-15 15m0 0h11.25m-11.25 0V8.25" />
                    </svg>
                  )}
                </div>

                {/* Info */}
                <div>
                  <div className="text-lg font-bold text-slate-900">
                    {label}
                  </div>

                  <div className="text-sm font-medium text-slate-500">
                    {formattedTime}
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className={`text-lg font-bold ${amountColor}`}>
                {isSent ? "-" : "+"} ₹{(m.amount / 100).toLocaleString('en-IN')}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}