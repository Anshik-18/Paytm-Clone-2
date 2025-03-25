// import { Phone } from "lucide-react";
// import { NextRequest, NextResponse } from "next/server";
// import { json } from "stream/consumers";

// export async function POST(req:NextRequest){
//     try{
//         const{amount,provider} = await req.json()
        
//         if(!amount || isNaN(amount) || amount <=0){
//             return NextResponse.json({success:false , message:"Invalid amount"  },{status:400});
//         }

//         if (provider !== "PhonePe") {
//             return NextResponse.json({ success: false, message: "Unsupported provider" }, { status: 400 });
//         }


//         const transactionId = `TXN_${Date.now()}`; // Unique transaction ID

//         const payload = {
//             merchantId: process.env.PHONEPE_MERCHANT_ID,
//             transactionId,
//             amount: amount * 100,  // Convert to paise
//             redirectUrl: process.env.PHONEPE_REDIRECT_URL,
//             callbackUrl: process.env.PHONEPE_CALLBACK_URL
//         };
        

//         const PhonePeResponse = await fetch("https://api-preprod.phonepe.com/apis/hermes/pg/v1/pay",{
//             method:"POST",
//             headers:{
//                 "Content-Type" :"application/json",
//                 "Authorization":`Bearer ${process.env.PHONEPE_API_KEY}`  
//             },
//             body : JSON.stringify(payload) 
//         }) 

//         const Phonepedata  = await PhonePeResponse.json();

//         if (Phonepedata.code !== "SUCCESS") {
//             throw new Error(Phonepedata.message || "PhonePe API error");
//         }
//         return NextResponse.json({
//             success: true,
//             redirectUrl: Phonepedata.redirectUrl
//         })

//     }

//     catch(error){
//         console.log("PhonePe payment Error:", error)
//         return NextResponse.json({success:false,message:"Payment initate failed" },{status:500})
//     }
// }






import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    try {
    

        const { amount, provider } = await req.json();

        
        if (!amount || isNaN(amount) || amount <= 0) {
            return NextResponse.json({ success: false, message: "Invalid amount" }, { status: 400 });
        }

        if (provider !== "PhonePe") {
            return NextResponse.json({ success: false, message: "Unsupported provider" }, { status: 400 });
        }

        
        const phonePePayload = {
            merchantId: process.env.PHONEPE_MERCHANT_ID,
            amount: amount * 100,
            redirectUrl: process.env.PHONEPE_REDIRECT_URL,
            callbackUrl: process.env.PHONEPE_CALLBACK_URL,
            provider: provider
        };

       

        const phonePeResponse = await fetch("https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.PHONEPE_SALT_KEY}`
            },
            body: JSON.stringify(phonePePayload)
        });

      
        if (!phonePeResponse.ok) {
          
            return NextResponse.json({ success: false, message: "Payment initiation failed" }, { status: 500 });
        }

        const responseData = await phonePeResponse.json();


        return NextResponse.json({ success: true, redirectUrl: responseData.redirectUrl });

    } catch (error) {
      
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
