import React, { useEffect } from "react";
import { createFromConfig, ZoomApiWrapper } from "@/lib/zoomapi";
import { ConfigOptions }  from "@zoom/appssdk";


type Apis = "setVirtualForeground" | "removeVirtualForeground"
const apiList: Apis[] = [
  "setVirtualForeground",
  "removeVirtualForeground",
];

interface RefreshAPIsProps {
  imageData: ImageData | null; 
}

const RefreshAPIs: React.FC<RefreshAPIsProps> = ({ imageData }) => {

  // const configOptions = {
  //       capabilities: [
  //         "setVirtualForeground",
  //         "removeVirtualForeground"
  //       ],
  //     };
  const configOptions: ConfigOptions = {
    capabilities: apiList
  }
  const zoomApiInstance: ZoomApiWrapper = createFromConfig(configOptions);

  useEffect(() => {
    if (imageData) {
      const setForegroundResponse = zoomApiInstance.setVirtualForeground(imageData);
      // console.log('Set Virtual Foreground Response:', setForegroundResponse);
    } else {
      const removeForegroundResponse = zoomApiInstance.removeVirtualForeground();
      // console.log('Remove Virtual Foreground Response:', removeForegroundResponse);
    }
  }, [imageData]);

  return (
    <label className="flex items-center cursor-pointer">
      <div>
        {/* Add content inside the label if needed */}
      </div>
    </label>
  );
};

export default RefreshAPIs;
