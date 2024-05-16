// Under Review

"use client";

import React from 'react';
import { useState, useEffect } from 'react';
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
import { fetchNametagFromDB, updateNameTagInDB } from '@/lib/nametag_db';

const zoomConfigOptions: ConfigOptions = {
  capabilities: [
    "setVirtualForeground",
    "removeVirtualForeground",
  ]
};
const zoomApi: ZoomApiWrapper = createFromConfig(zoomConfigOptions);
const foregroundDrawer: DrawBadgeApi = new DrawBadgeApi(zoomApi);

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
  
  const [nameTagContent, setNameTagContent] = useState<NameTagContent>({
    visible:false,
    fullName:"",
    preferredName:"",
    pronouns:"",
    disclosure:"",
  });

  const [nameTagIsLoaded, setNameTagIsLoaded] = useState(false);

  // TODO: refactor HandWave component to maintain the selected state there
  //       only use the callback function to redraw when the state is changed.
  const handleWaveHandsClick = (num: number) => {
    setSelectedWaveHand(num)

    const handWave: HandWaveBadge =
       state.selectedWaveHand !== null ?
           {visible: true, waveText: state.waveHands[state.selectedWaveHand]} :
           {visible: false};

    foregroundDrawer.drawHandWave(handWave);
  };

  const updateNameTagContent: SubmitHandler<NameTagContent> = (data) => {
    setNameTagContent(data);
    foregroundDrawer.drawNameTag(data);

    // Update nametag in DB
    updateNameTagInDB(data);
  };

  const updateHandWaveBadge = (badge: HandWaveBadge) => {
    foregroundDrawer.drawHandWave(badge);
  };

  //TODO: query and load user saved buttons;
  const savedWaveHandButtons = defaultWaveHandButtons;
  
  useEffect(() => {
    fetchNametagFromDB().then((newNameTag) => {
      if (newNameTag !== undefined) {
        setNameTagContent(newNameTag);
      }
      setNameTagIsLoaded(true);
    });
  }, []);

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
            {nameTagIsLoaded && <NameTagForm
              content={nameTagContent}
              onNameTagContentChange={updateNameTagContent}
            />}
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
