// Handle updating the user's nametag
import { NameTagContent } from "@/components/NameTagForm";
import startDB from "@/lib/db";
import UserModel from "@/models/userModel";
import { NextResponse } from "next/server";

interface UpdateUserNametagRequest {
    email: string;
    nameTag: NameTagContent;
}

type UpdateUserNametagResponse = NextResponse<{ success?: boolean; error?: string }>;

// Make a POST request to update a user's nametag
export const POST = async (req: Request): Promise<UpdateUserNametagResponse> => {
    const body = (await req.json()) as UpdateUserNametagRequest;

    await startDB();

    await UserModel.updateOne({ email: body.email }, { nameTag: body.nameTag });

    return NextResponse.json({ success: true, }, { status: 200 });
};
