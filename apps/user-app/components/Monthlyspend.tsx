import { Card } from "@repo/ui/card";

export const Monthlyspend = ({ spend_amount }: {
    spend_amount: number;
}) => {

    const precentage_of_spend = spend_amount / 10000 * 100;
    return <Card title={"Monthly Spend"}>
        <div className="flex-col justify-between pb-2">
            <div className="text-3xl font-bold text-slate-900">
                ₹{(spend_amount / 100).toLocaleString('en-IN')}
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full mt-4 overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full transition-all duration-700 ease-out" style={{ width: `${precentage_of_spend}%` }}>
                </div>
            </div>
            <div className="pt-3 text-sm text-slate-500 font-medium">
                Spent this month
            </div>
        </div>





    </Card>
}