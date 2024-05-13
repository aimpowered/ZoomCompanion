// Under Review

"use client";

import React from 'react';
import { useState } from 'react';
import { SubmitHandler } from "react-hook-form";
import Tabs from "./Tabs";
import Mindfulness from "./Mindfulness";
import Affirmation from "./Affirmation";
import { useCustomState } from './state';
import { NameTagContent, NameTagForm } from "@/components/NameTagForm";
import { WaveHandPicker } from "@/components/WaveHandPicker";
import { AffirmationCarousel } from '@/components/AffirmationCarousel';
import { HandWaveBadge, DrawBadgeApi } from "@/lib/draw_badge_api";
import { createFromConfig, ZoomApiWrapper } from "@/lib/zoomapi";
import { ConfigOptions }  from "@zoom/appssdk";
import zoomSdk from "@zoom/appssdk";

const zoomConfigOptions: ConfigOptions = {
  capabilities: [
    "setVirtualForeground",
    "removeVirtualForeground",
    "onMyMediaChange",
  ]
};
const zoomApi: ZoomApiWrapper = createFromConfig(zoomConfigOptions);

const foregroundDrawer: DrawBadgeApi = new DrawBadgeApi(zoomApi);

// TODO: Ideally this should be in the /lib/draw_badge_api
zoomSdk.config({
    capabilities: [
    "setVirtualForeground",
    "removeVirtualForeground",
    "onMyMediaChange",
  ]
})
zoomSdk.onMyMediaChange((event) => {
  console.log(event)
  if (
    event.media &&
    'video' in event.media &&
    event.media.video &&
    event.media.video.state &&
    typeof event.media.video.width === 'number' &&
    typeof event.media.video.height === 'number'
  ) {
    foregroundDrawer.drawCameraSizeChange(event.media.video.width, event.media.video.height);
  }
});

const defaultWaveHandButtons = [
    '',
    'I\'m not done',
    'Question',
    'Agree',
    'Different Opinion',
    'Support',
];

const defaultAffirmations = [
    'Say what I want to say, whatever happens will help me grow',
    'I can take up space',
    'I have an important voice',
    'Feel the tension and proceed',
    'I have the right to stutter',
]

function App() {
  const { state, 
  setCurrentAffirmation,
  setAllAffirmations,
  } = useCustomState();
  
  //TODO: initialize nametag with stored values
  const [nameTagContent, setNameTagContent] = useState<NameTagContent>({
    visible:false,
    fullName:"",
    preferredName:"",
    pronouns:"",
    disclosure:"",
  });

  //TODO: store the new nametag content into DB
  const updateNameTagContent: SubmitHandler<NameTagContent> = (data) => {
    setNameTagContent(data);
    foregroundDrawer.drawNameTag(data);
  };

  const updateHandWaveBadge = (badge: HandWaveBadge) => {
    foregroundDrawer.drawHandWave(badge);
  };

  //TODO: query and load user saved buttons;
  const savedWaveHandButtons = defaultWaveHandButtons;

  return (
    <div>
      <div className="header">
        <AffirmationCarousel
          initialAffirmations={defaultAffirmations}
        />
      </div>

      <WaveHandPicker
        initialHands={savedWaveHandButtons}
        updateHandWaveBadge={updateHandWaveBadge}
      />

      <div>
        <Tabs>
          <div page-label="affirmation">
            <Affirmation 
              allAffirmations={state.allAffirmations}
              setCurrentAffirmation={setCurrentAffirmation}
              setAllAffirmations={setAllAffirmations}
            />
          </div>

          <div page-label="nametag">
            <NameTagForm
              content={nameTagContent}
              onNameTagContentChange={updateNameTagContent}
            />
          </div>

          <div page-label="mindfulness">
            <Mindfulness />
          </div>

          <div page-label="wave-hands">
            wave-hands here! this tab is also <em>extinct</em>!
          </div>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
