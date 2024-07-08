// import https from 'https';
import startDB from "@/lib/db";
import UserModel from "@/models/userModel";
import { NextResponse } from "next/server";

const ZOOM_CHATBOT_TIMEOUT = process.env.ZOOM_CHATBOT_TIMEOUT || 180;
const LIBORATE_BOT_NAME = process.env.LIBORATE_BOT_NAME || "LibOrate Bot";
const RECALL_AI_API_BASE_URL = process.env.RECALL_AI_API_BASE_URL || "https://us-west-2.recall.ai/api/v1";

/**
 * POST request to send chat message to a meeting chat that the user is currently in
 */

interface SendChatMessageRequest {
    userEmail: string;
    meetingJoinUrl: string;
    meetingUUID: string;
    message: string;
    userName?: string;
}

type SendChatMessageResponse = NextResponse<{ success?: boolean; error?: string }>;

export const POST = async (req: Request): Promise<SendChatMessageResponse> => {
    const body = (await req.json()) as SendChatMessageRequest;

    const errorHandlingForServerErrors = function(error: unknown) {
      console.error(error);
  
      return NextResponse.json({
        success: false,
        error: error
      }, { status: 500 });
    };

    await startDB();


    /* STEP 1: Check if there is an active bot for the user and if the meeting UUID of the bot
       is the same as the meeting UUID passed in. */

    let activeBotId = null;
    let activeBotStatus = null;

    // Get the user
    const user = await UserModel.findOne({ email: body.userEmail });
    if (!user) {
      return NextResponse.json({
        success: false,
        error: `User with email '${body.userEmail}' does not exist.`
      },
      { status: 400 });
    }

    // user.botId == the bot ID of the most recent bot created for the user, if it exists
    if (user.botId) {
      // Retrieve the bot (using the Recall.ai API)
      const retrieveBotResponse = await fetch(`${RECALL_AI_API_BASE_URL}/bot/${user.botId}/`, { 
        method: "GET",
        headers: {
          "Authorization": `Token ${process.env.RECALL_API_KEY}`,
          "accept": "application/json"
        }
      }).catch(errorHandlingForServerErrors);

      const retrieveBotResponseJson = await retrieveBotResponse.json().catch(errorHandlingForServerErrors);

      // Check the meeting URL of the bot to see if it matches the meeting URL that was passed in
      if (retrieveBotResponseJson.meeting_metadata) {
        console.log(`retrieveBotResponseJson.meeting_metadata.zoom_meeting_uuid = ${retrieveBotResponseJson.meeting_metadata.zoom_meeting_uuid}`);
      }
      console.log(`body.meetingUUID = ${body.meetingUUID}`);
      if (retrieveBotResponseJson.meeting_metadata && retrieveBotResponseJson.meeting_metadata.zoom_meeting_uuid === body.meetingUUID) {
        // Retrieve the bot's current status
        activeBotStatus = retrieveBotResponseJson.status_changes[retrieveBotResponseJson.status_changes.length - 1].code;
        
        // Set the activeBotId
        activeBotId = user.botId;
      }
    }


    /* STEP 2: If there is NOT an active bot for the user in the current meeting, then create
       one and use it to send the new disclosure message to meeting participants. */

    if (activeBotStatus === null || activeBotStatus === "done" || activeBotStatus === "fatal") {
      const createBotResponse = await fetch(`${RECALL_AI_API_BASE_URL}/bot/`, { 
        method: "POST",
        headers: {
          "Authorization": `Token ${process.env.RECALL_API_KEY}`,
          "accept": "application/json",
          "content-type": "application/json"
        },
        body: JSON.stringify({
          "meeting_url": body.meetingJoinUrl,
          "bot_name": (body.userName && body.userName !== "") ? `${LIBORATE_BOT_NAME} (for ${body.userName})` : `${LIBORATE_BOT_NAME}`,
          "automatic_leave": {
            "waiting_room_timeout": ZOOM_CHATBOT_TIMEOUT,
            "noone_joined_timeout": ZOOM_CHATBOT_TIMEOUT,
            "in_call_not_recording_timeout": ZOOM_CHATBOT_TIMEOUT
          },
          "recording_mode_options": {
            "start_recording_on": "manual"
          },
          "chat": {
            "on_bot_join": {
              "send_to": "everyone",
              "message": body.message
            }
          }
        })
      }).catch(errorHandlingForServerErrors);

      const createBotResponseJson = await createBotResponse.json().catch(errorHandlingForServerErrors);

      // Update the bot ID in the user's DB entry
      await UserModel.updateOne({ email: body.userEmail}, {
        botId: createBotResponseJson.id
      });
    }


    /* STEP 3: If there is an active bot for the user and the bot is not currently in the
       waiting room, then use it to send the new disclosure message to meeting participants. */

    else if (activeBotStatus !== "in_waiting_room")
    {
      await fetch(`${RECALL_AI_API_BASE_URL}/bot/${activeBotId}/send_chat_message/`, { 
        method: "POST",
        headers: {
          "Authorization": `Token ${process.env.RECALL_API_KEY}`,
          "accept": "application/json",
          "content-type": "application/json"
        },
        body: JSON.stringify({
          "message": body.message
        })
      }).catch(errorHandlingForServerErrors);
    }


    return NextResponse.json({ success: true }, { status: 200 });
};
