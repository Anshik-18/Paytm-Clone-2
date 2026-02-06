import { Card } from "@repo/ui/card";

export const Monthlyspend = ({spend_amount }: {
    spend_amount: number;
}) => {
    
    const precentage_of_spend =  spend_amount / 10000 * 100; 
    return <Card title={"Monthly Spend"}>
        <div className="flex-col justify-between  pb-2">
         
            <div className="text-3xl ">
                ₹{spend_amount / 100} 
            </div>
            <div className="w-[90%]  h-2 bg-gray-200 rounded-full  mt-3 overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{width: `${precentage_of_spend}%`}}>

                </div>

            </div>
            <div className="pt-2 text-sm text-gray-500">
                Spent this month 
            </div>
        </div>



    

    </Card>
}