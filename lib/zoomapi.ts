import zoomSdk, {ConfigOptions, ConfigResponse, GeneralMessageResponse }  from "@zoom/appssdk";

export interface ZoomApiWrapper {
  setVirtualForeground(imageData: ImageData): Promise<GeneralMessageResponse>;
  removeVirtualForeground(): Promise<GeneralMessageResponse>;
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
    const configResponse = await this.initialize();
    // console.log(`Zoom SDK config response: ${configResponse}`);
    return zoomSdk.setVirtualForeground({imageData});
  }

  async removeVirtualForeground(): Promise<GeneralMessageResponse> {
    const configResponse = await this.initialize();
    // console.log(`Zoom SDK config response: ${configResponse}`);
    return zoomSdk.removeVirtualForeground();
  }

}
