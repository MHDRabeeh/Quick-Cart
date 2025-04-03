import Address from "@/app/models/address";
import connectDB from "@/config/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {

    try {
        const {userId} = getAuth(req);
        const {address} = await req.json();
        await connectDB()
        const newAddress = await Address.create({...address,userId});
        return NextResponse.json({success:true,message:"address added successfully",newAddress})
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({success:false,message:error.message});
    }
}
