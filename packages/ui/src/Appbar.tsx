import { Button } from "./button";
import { NotificationIcon } from "./Notification";



interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignin: () => void,
    onSignout: () => void
}



export const Appbar = ({
    user,
    onSignin,
    onSignout

}: AppbarProps) => {



    return <div className="flex justify-between  items-center  px-4">
        <div className="text-lg text-[#F5F5F5] font-bold py-4">
            PAYFLOW
        </div>
        <div className="flex flex-col  ml-auto mr-4 ">
            <NotificationIcon count={1} />

        </div>
        <div className="flex  pt-2">
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
        </div>
    </div>
}