
import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"
import prisma from "@repo/db/client"
// import Notification from "../../../components/Notificaion"
import { NotificationIcon } from "@repo/ui/Notification"

export async function notifications(){
    const session   = await getServerSession(authOptions)

    if(!session?.user?.id){
        return []
    }

    const notifications = await prisma.notification.findMany({
        where:{
            userId :  Number(session?.user?.id)
        }
    })
    return notifications.map(n=>({
        time : n.timestamp,
        from : n.FromuserID || "system",
        Message : n?.Message,
        Amount : n?.Amount

    }))
}
export default async function NotificationList() {
    const noti = await notifications() ;

    return (
        <div className="p-4 space-y-4">
            {noti.length === 0  ? (
                <p className="text-gray-500">No notifications</p>
            ) : (
                noti.map((n, index) => (
                    <div key={index} className="border p-3 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-500">{n.time.toLocaleString()}</p>
                        <p className="font-semibold">From: {n.from}</p>
                        <p>{n.Message}</p>
                        {n.Amount && <p className="text-green-500">Amount: {n.Amount/100}</p>}
                    </div>
                ))
            )}
        </div>
    );
}
