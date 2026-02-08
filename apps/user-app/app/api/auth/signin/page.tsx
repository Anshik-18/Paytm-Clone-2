'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { set } from "zod";

export default function SignInPage() {
    const router = useRouter();
    // const searchParams = useSearchParams();
    const callbackUrl = "/dashboard";

    const GUEST_PHONE = "1234567890";
    const GUEST_PASSWORD = "111111";
    const GUEST_NAME = "Guest";

    const [phone, setPhone] = useState("");
    const[name,setname] = useState("")
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const[loading,setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
            setLoading(true);

        const res = await signIn("credentials", {
            name,
            phone,
            password,
            redirect: false,
            callbackUrl
        });
        setLoading(false);
        if (res?.error) {
            setError(res.error);
        } else {
            router.push(callbackUrl);
        }
    };

    const handleGuestSignIn = async () => {
        setError("");
        setLoading(true);

        const res = await signIn("credentials", {
            name: GUEST_NAME,
            phone: GUEST_PHONE,
            password: GUEST_PASSWORD,
            redirect: false,
            callbackUrl
        });
        setLoading(false);

        if (res?.error) {
            setError(res.error);
        } else {
            router.push(callbackUrl);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white shadow-md rounded-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>

                {error && <p className="text-red-500 text-center mb-2">{error}</p>}
                {loading && <p className="text-blue-500 text-center mb-2">Signing in...</p>}

                <form onSubmit={handleSubmit} className="flex flex-col">
                    <label className="mb-2">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        className="border p-2 rounded mb-4"
                        placeholder="Anshik"
                        required
                    />
                    <label className="mb-2">Phone Number</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="border p-2 rounded mb-4"
                        placeholder="1234567890"
                        required
                    />

                    <label className="mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2 rounded mb-4"
                        placeholder="Enter your password"
                        required
                    />

                    <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                        Sign In
                    </button>
                </form>

                <button
                    type="button"
                    onClick={handleGuestSignIn}
                    className="mt-4 w-full bg-gray-200 text-gray-900 p-2 rounded hover:bg-gray-300"
                >
                    Continue as Guest
                </button>
            </div>
        </div>
    );
}
