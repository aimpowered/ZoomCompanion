// Handle updating the user's nametag
import { NameTagContent } from "@/components/NameTagForm";
import startDB from "@/lib/db";
import UserModel from "@/models/userModel";
import { NextResponse } from "next/server";

interface FetchUserNametagRequest {
    email: string;
}

type FetchUserNametagResponse = NextResponse<{
  success?: boolean;
  error?: string;
  nameTag?: NameTagContent;
}>;

// Make a POST request to fetch a user's nametag
export const POST = async (req: Request): Promise<FetchUserNametagResponse> => {
    const body = (await req.json()) as FetchUserNametagRequest;

    await startDB();

    const user = await UserModel.findOne({ email: body.email });

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
};
