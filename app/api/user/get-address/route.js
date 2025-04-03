import Address from "@/app/models/address";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { userId } = getAuth(req);
    if (userId) {
      const allAddress = await Address.find({userId});
      return NextResponse.json({
        success: true,
        message: "successfully fetch all address",
        allAddress,
      });
    }
  } catch (error) {

    return NextResponse.json({
        success: false,
        message: error.message
      });
  }
 
}
