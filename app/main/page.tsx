"use client";

import React, { useState, useEffect } from 'react';
import Tabs from "./Tabs";
import Mindfulness from "./Mindfulness";
import Affirmation from "./Affirmation";
import NameTag from "./NameTag";
import { useCustomState } from './state';

function App() {

  const { state, 
  setSelectedWaveHand,
  setHandChoicesAsString, 
  setCurrentAffirmation,
  setAllAffirmations,
  setCurrentNameTag,
  setNameTagStatus,} = useCustomState();
  

  const initialWaveHands: string[] = [
    '👋',
    '👋 I\'m not done',
    '👋 Question',
    '👋 Agree',
    '👋 Different Opinion',
    '👋 Support',
  ];


  const handleWaveHandsClick = (text: string) => {
    setSelectedWaveHand(text)
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
          <div label="affirmation">
            <Affirmation 
              allAffirmations={state.allAffirmations}
              setCurrentAffirmation={setCurrentAffirmation}
              setAllAffirmations={setAllAffirmations}
            />
          </div>

          <div label="nametag">
            <NameTag 
              currentNameTag={state.currentNameTag}
              nameTagStatus={state.nameTagStatus}
              setCurrentNameTag={setCurrentNameTag}
              setNameTagStatus={setNameTagStatus}
            />
          </div>

          <div label="mindfulness">
            <Mindfulness />
          </div>

          <div label="wave-hands">
            wave-hands here! this tab is also <em>extinct</em>!
          </div>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
