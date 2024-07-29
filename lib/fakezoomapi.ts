import { ZoomApiWrapper } from './zoomapi';
import { GeneralMessageResponse }  from "@zoom/appssdk";

class FakeZoomApi implements ZoomApiWrapper {
  async setVirtualForeground(): Promise<GeneralMessageResponse> { return null as unknown as GeneralMessageResponse; }
  async removeVirtualForeground(): Promise<GeneralMessageResponse> { return null as unknown as GeneralMessageResponse; }
}
export type {ZoomApiWrapper};

export function createFromConfig() {
  return new FakeZoomApi();
}
