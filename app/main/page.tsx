// Under Review

"use client";

import React from 'react';
import Tabs from "./Tabs";
import Mindfulness from "./Mindfulness";
import Affirmation from "./Affirmation";
import NameTag from "./NameTag";
import { useCustomState } from './state';
import { NameTagBadge, HandWaveBadge, drawEverythingToImage } from "@/lib/draw_badge_api";

import { createFromConfig, ZoomApiWrapper } from "@/lib/zoomapi";
import { ConfigOptions }  from "@zoom/appssdk";


type Apis = "setVirtualForeground" | "removeVirtualForeground"
const apiList: Apis[] = [
  "setVirtualForeground",
  "removeVirtualForeground",
];

function App() {

  const { state, 
  setSelectedWaveHand,
  setCurrentAffirmation,
  setAllAffirmations,
  setCurrentNameTag,
  setNameTagStatus,} = useCustomState();
  

  const handleWaveHandsClick = (num: number) => {
    setSelectedWaveHand(num)

    const nametag: NameTagBadge = {
        visible: state.nameTagStatus,
        fullName: state.currentNameTag[0],
        preferredName: state.currentNameTag[1],
        pronouns: state.currentNameTag[2],
        disclosure: state.currentNameTag[3],
    };

    const handWave: HandWaveBadge =
       state.selectedWaveHand !== null ?
           {visible: true, waveText: state.waveHands[state.selectedWaveHand]} :
           {visible: false};

    // TODO: Switch this to use DrawBadgeApi
    const imageData = drawEverythingToImage(nametag, handWave);
    
    console.log(state.selectedWaveHand)
    const configOptions: ConfigOptions = {
      capabilities: apiList
    };
    const zoomApiInstance: ZoomApiWrapper = createFromConfig(configOptions);

    if (imageData) {
      zoomApiInstance.setVirtualForeground(imageData);
    } else {
      zoomApiInstance.removeVirtualForeground();
    }
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
            <NameTag 
              currentNameTag={state.currentNameTag}
              nameTagStatus={state.nameTagStatus}
              setCurrentNameTag={setCurrentNameTag}
              setNameTagStatus={setNameTagStatus}

              selectedWaveHand = {state.selectedWaveHand}
              waveHands = {state.waveHands}
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
