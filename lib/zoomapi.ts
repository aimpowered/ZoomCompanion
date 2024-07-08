import zoomSdk, {ConfigOptions, ConfigResponse, GeneralMessageResponse }  from "@zoom/appssdk";
import { getSession } from 'next-auth/react';

export interface ZoomApiWrapper {
  setVirtualForeground(imageData: ImageData): Promise<GeneralMessageResponse>;
  removeVirtualForeground(): Promise<GeneralMessageResponse>;
  sendChatMessage(chatMessage: string, userName?: string): Promise<boolean>;
}

export function createFromConfig(options: ConfigOptions) {
  return new ZoomApiImpl(options);
}

class ZoomApiImpl implements ZoomApiWrapper {
  private configResponse: null|Promise<ConfigResponse> = null;
  constructor(private configOptions: ConfigOptions) {}

  initialize() {
    if (this.configResponse == null) {
      this.configResponse = zoomSdk.config(this.configOptions);
    }
    return this.configResponse;

  }

  async setVirtualForeground(imageData: ImageData): Promise<GeneralMessageResponse> {
    await this.initialize();
    return zoomSdk.setVirtualForeground({imageData});
  }

  async removeVirtualForeground(): Promise<GeneralMessageResponse> {
    await this.initialize();
    return zoomSdk.removeVirtualForeground();
  }

  async sendChatMessage(chatMessage: string, userName?: string): Promise<boolean> {
    await this.initialize();
    
    const getMeetingJoinUrlResponse = await zoomSdk.getMeetingJoinUrl();
    const getMeetingUUIDResponse = await zoomSdk.getMeetingUUID();

    const session = await getSession();

    if (session && session.user) {
      await fetch("/api/chatMessages", { 
        method: "POST",
        body: JSON.stringify({
            userEmail: session.user.email,
            meetingJoinUrl: getMeetingJoinUrlResponse.joinUrl,
            meetingUUID: getMeetingUUIDResponse.meetingUUID,
            message: chatMessage,
            userName: (typeof userName !== 'undefined') ? userName : null
        }),
      }).catch((error) => {
          console.error(`[sendChatMessage] Error sending chat message: ${error}`);
          return false;
      });

      return true;
    }

    else {
      return false;
    }
  }
}
