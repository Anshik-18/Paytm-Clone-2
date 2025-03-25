export async function intiatiePhonePePayment(amount:number,provider:string){
    
    try {
        
    
        const response  = await fetch (`${window.location.origin}/api/phonepe`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({amount:amount*100,provider:provider})
        })


        
        if (!response.ok) {
            throw new Error("Failed to initiate PhonePe payment");
        }
        const responsedata =  await response.json()
        return responsedata
    }
    catch(e){
        console.error("Error initiating PhonePe payment:", e);
        return { success: false, message: "Payment initiation failed" };
    }


}