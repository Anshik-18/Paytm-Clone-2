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
    return <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="text-2xl font-bold text-slate-900 tracking-tight cursor-pointer">
            PAYFLOW
        </div>

        <div className="flex items-center gap-6">
            <div className="text-slate-500 hover:text-blue-600 transition-colors cursor-pointer">
                <NotificationIcon count={1} />
            </div>

            <div className="flex items-center gap-3">
                {user && <span className="text-sm font-semibold text-slate-700 hidden sm:block">Hello, {user.name}</span>}
                <Button
                    onClick={user ? onSignout : onSignin}
                    variant={user ? "outline" : "primary"}
                >
                    {user ? "Logout" : "Login"}
                </Button>
            </div>
        </div>
    </div>
}