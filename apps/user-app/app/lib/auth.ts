
import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import { use } from "react";
import prisma from "@repo/db/client";
import { z } from "zod";

const loginschema  = z.object({
    PhoneNumber: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
    Password : z.string().min(6,"Password is too short")
}) 

export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            phone: { label: "Phone Number", type: "text", placeholder: "1231231231", required: true },
            password: { label: "Password", type: "password", required: true }
          },
          
          async authorize(credentials: any) {
            const parsed = loginschema.safeParse({
                PhoneNumber: credentials.phone,
                Password : credentials.password
            })
            if (!parsed.success) {
                throw new Error(parsed.error?.issues[0]?.message);
              }
              const {PhoneNumber,Password} = parsed.data 
       

            const hashedPassword = await bcrypt.hash(Password, 10);
            const existingUser = await db.user.findFirst({
                where: {
                    number: PhoneNumber
                }
            });

            if (existingUser) {
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                if (passwordValidation) {
                    await prisma.notification.create({
                        data: {
                            userId: existingUser.id,
                            FromuserID : null,
                            Message: "Welcome back! Happy to see you again.",
                        }
                    });
                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        email: existingUser.number
                    }
                }
                throw new Error("Please check you phone numebr or password ");
            }

            try {
                const user = await db.user.create({
                    data: {
                        number: PhoneNumber,
                        password: hashedPassword
                    }
                });

                await prisma.balance.create({
                    data:{
                        userId: user.id,
                        amount: 0,
                        locked: 0 ,     
                }
            })
            await prisma.notification.create({
                data:{
                    userId: user.id,
                    Message: "Created new account. Welcome to paytm family"
                }
            })
            
            
                return {
                    id: user.id.toString(),
                    name: user.name,
                    email: user.number
                }
            } catch(e) {
                console.error(e);
            }

            return null
          },
        })
    ],
    pages: {
        signIn: "/auth/signin"  
    },
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
   
        async session({ token, session }: any) {
            session.user.id = token.sub

            return session
        }
    }
  }
  
