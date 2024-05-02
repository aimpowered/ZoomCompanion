// Handle updating the user's nametag
import { NameTagContent } from "@/components/NameTagForm";
import startDB from "@/lib/db";
import UserModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

type FetchUserNametagResponse = NextResponse<{
  success?: boolean;
  error?: string;
  nameTag?: NameTagContent;
}>;

// Make a GET request to fetch a user's nametag
export const GET = async (req: NextRequest): Promise<FetchUserNametagResponse> => {
    const userEmail = req.nextUrl.searchParams.get("userEmail");

    if (userEmail) {
      await startDB();

      const user = await UserModel.findOne({ email: userEmail });

      if (user) {
        return NextResponse.json({
          success: true,
          nameTag: user?.nameTag
        },
        { status: 200 });
      }
      else {
        return NextResponse.json({
          success: false,
          error: "User does not exist."
        },
        { status: 400 });
      }
    }

    else {
      return NextResponse.json({
        success: false,
        error: "userEmail param not specified."
      },
      { status: 400 });
    }
};
