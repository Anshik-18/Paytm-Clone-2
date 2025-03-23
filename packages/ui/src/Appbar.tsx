import { Button } from "./button";
// import { NotificationIcon } from "./Notification";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignin: ()=>void,
    onSignout: ()=>void,
    count:number
}

export const Appbar = ({
    user,
    onSignin,
    onSignout,
    count
}: AppbarProps) => {
    return <div className="flex justify-between border-b px-4">
        <div className="text-lg flex flex-col justify-center">
            PayTM 
        </div>
        <div className="">
            {/* <NotificationIcon count={count}/> */}
        
        </div>
        <div className="flex flex-col justify-center pt-2">
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
        </div>
    </div>
}