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
import { HandWaveBadge, DrawBadgeApi } from "@/lib/draw_badge_api";

import { createFromConfig, ZoomApiWrapper } from "@/lib/zoomapi";
import { ConfigOptions }  from "@zoom/appssdk";


type Apis = "setVirtualForeground" | "removeVirtualForeground"
const apiList: Apis[] = [
  "setVirtualForeground",
  "removeVirtualForeground",
];

const zoomConfigOptions: ConfigOptions = {
  capabilities: apiList
};
const zoomApi: ZoomApiWrapper = createFromConfig(zoomConfigOptions);
const foregroundDrawer: DrawBadgeApi = new DrawBadgeApi(zoomApi);


function App() {
 
  const { state, 
  setSelectedWaveHand,
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

  // TODO: refactor HandWave component to maintain the selected state there
  //       only use the callback function to redraw when the state is changed.
  const handleWaveHandsClick = (num: number) => {
    setSelectedWaveHand(num)

    const handWave: HandWaveBadge =
       state.selectedWaveHand !== null ?
           {visible: true, waveText: state.waveHands[state.selectedWaveHand]} :
           {visible: false};

    foregroundDrawer.drawHandWave(handWave);
    
    console.log(state.selectedWaveHand);
  };

  //TODO: store the new nametag content into DB
  const updateNameTagContent: SubmitHandler<NameTagContent> = (data) => {
    setNameTagContent(data);
    foregroundDrawer.drawNameTag({
      visible: data.visible,
      fullName: data.fullName,
      preferredName: data.preferredName,
      pronouns: data.pronouns,
      disclosure: data.disclosure,
    });
  };

  return (
    <div>
      <div className="header">
        <div className="self-confirm">
          <h1>{state.selectedAffirmation}</h1>
        </div>
      </div>

      <div className="button-rows">
        {state.waveHands.map((waveHand, index) => (
          <button
            key={index}
            className={`wave-hand-button ${state.selectedWaveHand === index ? 'selected' : ''}`}
            onClick={() => handleWaveHandsClick(index)}
          >
            {waveHand}
          </button>
        ))}
      </div>

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
