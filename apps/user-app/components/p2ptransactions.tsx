import { Card } from "@repo/ui/card";

export const P2pTransfer = ({
   mode,
   recieve
}: { mode : string ,recieve:{
    fromUserId : number,
    toUserId : number,
    timestamp  : Date,
    amount : number,
    fromname: string,
    toname : string
}[]}) => {
    const title  = mode === "send" ? "Money Sent" : "Money Received";

    if (!recieve.length) {
        return (
            <Card title={title} >
                <div className="text-gray-500 text-lg py-6">No Transactions</div>
            </Card>
        );
    }
    

    return (
        <Card title={title} >
            <div className="pt-2 space-y-4">
                {recieve.map((t, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm">
                        <div>
                            <div className="text-sm font-medium text-gray-800">
                                {mode === "send" ? "Sent INR" : "Received INR"}
                            </div>
                            <div className="text-gray-600 text-xs">
                            {new Date(t.timestamp).toDateString()}
                            </div>
                        </div>
                        <div className="text-sm text-gray-700">
                            <span className="font-semibold">From:</span> {t.fromname}
                        </div>
                        <div className="text-sm text-gray-700">
                            <span className="font-semibold">To:</span> {t.toname}
                        </div>
                        <div className="text-md font-bold text-green-600">
                             Amount: ₹{(t.amount / 100).toFixed(2)}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};
