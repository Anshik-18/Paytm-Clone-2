"use client"

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card"
import { Textinput } from "@repo/ui/Textinput"
import { useEffect, useState } from "react"
import { requestmoney } from "../app/lib/actions/requestmoney";

interface User {
    name: string;
    number: string;
}

export const Requestcard = ()=>{
    const[number,setnumber] = useState("")
    const[amount,setamount] = useState <string>("")
    const[name,setname] = useState <string>("");
    const[users_name,setusers_name] = useState<User[]>([])
    const[users_number,setusers_number] = useState <User[]>([])
    const [hidden, sethidden] = useState<boolean>(false);
   


      const handleuserclick = (user :User) => {
        sethidden(true)
      
        setname(user.name);
        setnumber(user.number); 
    };

    useEffect(()=>{
        
        if(name.length<2){
            sethidden(false)
            setusers_name([])
            return
        }
       

        const delaydebounce =  setTimeout(() => {
            fetch(`/api/user/search?n=${name}`)
            .then((res)=>res.json())
            .then((data)=>setusers_name(data))
            .catch((err)=>console.log(err))
          
            
        }, 300);
        return( ()=> clearTimeout(delaydebounce))

    },[name])


    useEffect(()=>{
        if(number.length<2){
            sethidden(false)
            setusers_number([])
            return
        }

        const delaydebounce =  setTimeout(() => {
            fetch(`/api/user/search?n=${number}`)
            .then((res)=>res.json())
            .then((data)=>setusers_number(data))
            .catch((err)=>console.log(err)) 
            
            
        }, 300);
        return( ()=> clearInterval(delaydebounce))

    },[number])


    
    return(
        <div>
            <Card title="Request money">

                <Textinput placeholder="Name" label="Name" onChange={(value)=>{
                    setname(value)}} value={name}/>

                        <div className={users_name.length>0 &&  !hidden    ? "block": "hidden"}>
                            {users_name.map((user,index)=>(
                                <div key={index} className="cursor-pointer" onClick={()=>{
                                    handleuserclick(user)
                                }}> 
                                <p>{user.name}</p>
                                <p>{user.number}</p>

                                </div>

                            ))}
                        </div>
                
                <Textinput placeholder= "Number" label="Number" onChange={(value)=>{
                    setnumber(value)}} value={number}/>

                        <div className={users_number.length>0 && !hidden ?"block": "hidden"}>
                            {users_number.map((user,index)=>(
                                <div key={index} className="cursor-pointer" onClick={()=>{
                                    handleuserclick(user)
                                }}> 
                                <p>{user.name}</p>
                                <p>{user.number}</p>

                                </div>

                            ))}
                        </div>
                

                <Textinput placeholder="Amount" label="Amount" value={amount}   onChange={(value)=>{
                    setamount(value)}}/>

   

                
                <Button  onClick={async ()=>{
                     await requestmoney(Number(amount),number)

                }}>
                    Send request
                </Button>

            </Card>

        </div>
    )
}