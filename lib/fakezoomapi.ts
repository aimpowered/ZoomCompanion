import { ZoomApiWrapper } from './zoomapi';
import { GeneralMessageResponse }  from "@zoom/appssdk";

class FakeZoomApi implements ZoomApiWrapper {
  async setVirtualForeground(): Promise<GeneralMessageResponse> { return null as unknown as GeneralMessageResponse; }
  async removeVirtualForeground(): Promise<GeneralMessageResponse> { return null as unknown as GeneralMessageResponse; }
  async sendChatMessage(): Promise<boolean> { return null as unknown as boolean; }
}
export type {ZoomApiWrapper};

export function createFromConfig() {
  return new FakeZoomApi();
}
