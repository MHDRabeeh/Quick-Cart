import Address from "@/app/models/address";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { userId } = getAuth(req);
    console.log(" this Get request is working properly from get address",userId);
    
    if (userId) {
      const allAddress = await Address.find({userId});
      console.log(allAddress);
      
      return NextResponse.json({
        sucesss: true,
        message: "successfully fetch all address",
        allAddress,
      });
    }
  } catch (error) {

    return NextResponse.json({
        sucesss: false,
        message: error.message
      });
  }
 
}
