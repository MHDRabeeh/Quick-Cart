

import Order from "@/app/models/order";
import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export  async function GET(request){
try {
    const {userId} = getAuth(request)

    const isSeller = authSeller(userId);
    if(!isSeller){
        return NextResponse.json({success:false,message:'Not authorized'})
    }
    await connectDB()
    const orders = await Order.find({}).populate('address items.product')
    return NextResponse.json({success:true , orders})
} catch (error) {
    console.log(error.message);
    return NextResponse.json({success:false,message:error.message})
    
}
}