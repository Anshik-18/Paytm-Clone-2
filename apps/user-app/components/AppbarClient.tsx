"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { useRouter } from "next/navigation";

import { usePathname } from "next/navigation";



export   function AppbarClient() {
  const session = useSession();
  const router = useRouter();


  const pathname = usePathname();
  if (pathname.startsWith("/api")) return null;
  return (

    <div>
      <Appbar 
        onSignin={() => signIn(undefined, { callbackUrl: "/" })} 
        onSignout={async () => {
          await signOut();
          router.push("/api/auth/signin");
        }} 
        user={session.data?.user} 

      />
    </div>
  );
}
