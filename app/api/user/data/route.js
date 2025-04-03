import User from "@/app/models/user";
import connectDB from "@/config/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req){
try {
    const {userId} = getAuth(req)

    await connectDB();
    const user = await User.findById(userId)

    if(!user){
        return NextResponse.json({seccess:false,message:"user not found"})
    }
return NextResponse.json({success:true,user})


} catch (error) {
    return NextResponse.json({seccess:false,message:error.message})
}
}