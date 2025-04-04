import Address from "@/app/models/address";
import Order from "@/app/models/order";
import Product from "@/app/models/Produc";
import connectDB from "@/config/db";
import { getAuth } from "@clerk/nextjs/server";

import { NextResponse } from "next/server";


export async function GET(request) {
    try {
        const {userId} = getAuth(request)
        console.log({userId});
        
        await connectDB()
        const orders = await Order.find({userId}).populate("address items.product") 
        return NextResponse.json({success:true,orders})
    } catch (error) {
        return NextResponse.json({success:false,message:error.message})
    }
}