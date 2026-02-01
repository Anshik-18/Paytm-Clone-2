import { NextResponse } from "next/server"
import client from "@repo/db/client";

export const dynamic = 'force-dynamic';



export const GET = async () => {
    await client.user.create({
        data: {
            email: "asd",
            name: "adsads",
            number: "123123",
            password: "password"
        }
    })
    return NextResponse.json({
        message: "hi there"
    })
}