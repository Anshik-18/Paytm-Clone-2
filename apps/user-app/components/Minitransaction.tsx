import { Card } from "@repo/ui/card"

export function Minitransaction({ transaction }: { transaction: {
    fromuser : string,
    touser : string,
    fromUserId: number;
    toUserId: number;
    timestamp: Date;
    amount: number;
    mode: string;
}[] }) {
         if (!transaction.length) {
             return <Card title="Recent Transactions">
                 <div className="text-center pb-8 pt-8">
                     No Recent transactions
                 </div>
             </Card>
         }
         return (
             <Card title={"Recent Transactions"} >
                <div className="pt-2 space-y-4">
                    {transaction.map((t, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm">
                            <div>

                                <div className="text-sm font-medium text-gray-800">
                                    {t.mode === "send" ? "Sent INR" : "Received INR"}
                                </div>
                                <div className="text-gray-600 text-xs">
                                {new Date(t.timestamp).toDateString()}
                                </div>
                            </div>
                            <div className="text-sm text-gray-700">
                                <span className="font-semibold">From:</span> {t.fromuser}
                            </div>
                            <div className="text-sm text-gray-700">
                                <span className="font-semibold">To:</span> {t.touser}
                            </div>
                            <div className="text-md font-bold text-green-600">
                                 Amount: ₹{(t.amount / 100).toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        );
}