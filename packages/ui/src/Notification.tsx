import { Bell } from "lucide-react";
import Link from "next/link";

interface NotificationIconProps {
  count: number;
  
}

export function NotificationIcon({ count }: NotificationIconProps) {
  return (
    <Link href="/notification" className="relative cursor-pointer">
      {/* Bell Icon */}
      <Bell className="w-6 h-6 text-gray-500 hover:text-white" />

      {/* Red Dot for Notifications */}
      {count > 0 && (
        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full" />
      )}
    </Link>
  );
}