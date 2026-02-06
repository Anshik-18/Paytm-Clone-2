import { Card } from "@repo/ui/card"

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        status: string,
        provider: string
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    
    return <Card title="Recent Transactions">
        <div className="pt-4 ">
            {transactions.map((t, index) => <div className=" justify-between pt-1">
            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
                            <div className=" items-center ">
                                <div>
                                    {t.provider}
                                </div>
                                 

                                <div className="text-sm text-gray-500 pt-1">
                                    {new Date(t.time).toLocaleString("en-IN")}
                                </div>

                                
                            </div>
                            <div className={t.status === "Success" ? "text-green-500 font-semibold" : "text-red-500 font-semibold"}>
                                ₹{(t.amount / 100).toFixed(2)}
                            </div>
                        </div>
                


            </div>)}
        </div>
    </Card>
}