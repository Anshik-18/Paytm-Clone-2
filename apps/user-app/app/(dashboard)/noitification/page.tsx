
// import { getServerSession } from "next-auth"
// import { authOptions } from "../../lib/auth"
// import prisma from "@repo/db/client"
// import Notification from "../../../components/Notificaion"
// import { NotificationIcon } from "@repo/ui/Notification"

// export async function notifications(){
//     const session   = await getServerSession(authOptions)

//     const notifications = await prisma.notification.findMany({
//         where:{
//             userId :  Number(session?.user?.id)
//         }
//     })
//     return notifications.map(n=>({
//         time : n.timestamp,
//         from : n.FromuserID || "system",
//         Message : n?.Message,
//         Amount : n?.Amount

//     }))
// }
// export default async function NotificationList() {
//     const noti = await notifications();

//     return (
//      <NotificationIcon count={noti.length}/>
//     );
// }
