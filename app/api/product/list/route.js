import Product from "@/app/models/Produc";
import connectDB from "@/config/db";
import { NextResponse } from "next/server";


export async function GET(req){
try {
    await connectDB()
    const products = await Product.find({})
    if(!products){
        return NextResponse.json({success:false,message:"products not found "})
    }
    return NextResponse.json({success:true,products})
    
} catch (error) {
   return  NextResponse.json({success:false,message:error.message})
}
}