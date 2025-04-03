import User from "@/app/models/user";
import connectDB from "@/config/db";
import { getAuth } from "@clerk/nextjs/server";
import {  NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId } = getAuth(req);
    const { cartData } = await req.json();
    console.log(cartData,"ths is from  api ,,,, ");
    await connectDB();
    const user = await User.findById(userId);
    user.cartItems = cartData;
    await user.save();
    return NextResponse.json({ success: true, message: "cart updated" });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ success: false, message: error.message });
  }
}

