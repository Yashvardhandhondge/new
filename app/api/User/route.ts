import { error } from 'console';
import UserModel from '../../../models/Trees'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, res: NextResponse) {
   try {
      
      const { email, userId } = await req.json(); 

   
      const newUser = await UserModel.UserModel.create({
         email: email,
         userId: userId
      });

      return NextResponse.json({ newUser, message: "User Created Successfully" }, { status: 200 });
   } catch (e) {
   
      return NextResponse.json({ message: "Failed to create User", error: error }, { status: 500 });
   }
}

export async function GET(req: NextRequest) {
   const userId = req.nextUrl.searchParams.get('userId'); 

   try {
      
      const user = await UserModel.UserModel.findOne({ userId });

      if (!user) {
         return NextResponse.json({ message: "User not found" }, { status: 404 });
      }

      
      return NextResponse.json(user, { status: 200 });
   } catch (e) {
      
      return NextResponse.json({ message: "Failed to fetch User", error: error }, { status: 500 });
   }
}
