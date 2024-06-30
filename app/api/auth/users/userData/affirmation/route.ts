import { AffirmationContent } from "@/components/AffirmationCarousel";
import startDB from "@/lib/db";
import UserModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET request to fetch the user's affirmation cards
 */

type FetchUserAffirmationCardsResponse = NextResponse<{
  success?: boolean;
  error?: string;
  affirmationCards?: AffirmationContent[];
}>;

export const GET = async (req: NextRequest): Promise<FetchUserAffirmationCardsResponse> => {
    const userEmail = req.nextUrl.searchParams.get("userEmail");

    if (!userEmail) {
      return NextResponse.json({
        success: false,
        error: "userEmail param not specified."
      },
      { status: 400 });
    }
    
    await startDB();

    const user = await UserModel.findOne({ email: userEmail });

    if (!user) {
      return NextResponse.json({
        success: false,
        error: "User does not exist."
      },
      { status: 400 });
    }
    
    return NextResponse.json({
      success: true,
      affirmationCards: user?.affirmationCards
    },
    { status: 200 });
};

/**
 * POST request to update the user's affirmation cards
 */

interface UpdateUserAffirmationCardRequest {
    email: string;
    affirmationCards: AffirmationContent[];
}

type UpdateUserAffirmationCardResponse = NextResponse<{ success?: boolean; error?: string }>;

export const POST = async (req: Request): Promise<UpdateUserAffirmationCardResponse> => {
    const body = (await req.json()) as UpdateUserAffirmationCardRequest;

    await startDB();

    await UserModel.updateOne({ email: body.email }, { affirmationCards: body.affirmationCards });

    return NextResponse.json({ success: true, }, { status: 200 });
};
