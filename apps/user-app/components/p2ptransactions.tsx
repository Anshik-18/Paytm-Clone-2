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
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
                            <div className="flex items-center gap-3">

                                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-semibold">
                                     {   mode === "send" ? t.toname.charAt(0).toUpperCase() : t.fromname.charAt(0).toUpperCase()}
                                            {/* {t.toname.charAt(0).toUpperCase()} */}
                                    </div>
                                    <div> 
                                    
                                            <div className="font-medium text-gray-900">
                                            {mode === "send" ? t.toname : t.fromname}
                                            </div>
                                            <div className="text-sm text-gray-500 pt-1">
                                                {new Date(t.timestamp).toLocaleString("en-IN")}
                                            </div>

                                    </div>
                            </div>
                            <div className="text-red-500 font-semibold">
                                ₹{(t.amount / 100).toFixed(2)}
                            </div>
                        </div>
                ))}
            </div>
        </Card>
    );
};
