import prisma from "@repo/db/client";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req:NextRequest){
    try{

    
    const query = req.nextUrl.searchParams.get("n");

    if(  !query || query?.length<2){
        return NextResponse.json([])
    }
    let result
        if (/^\d+$/.test(query)){
            result = await prisma.user.findMany({
                where:{
                    number: {
                         startsWith: query
                    }
                }
            })
        }
        else{
            result = await prisma.user.findMany({
                where:{
                    name:{
                        startsWith:query
                    }
                    
                }
            })
        }

        return NextResponse.json(result)
    }
    catch(e){
        console.log("search error:",e)
        return NextResponse.json({error:"Something went wrong"},{status:500})

    }
}