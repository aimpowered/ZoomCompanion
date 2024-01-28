"use client";

import React, { useState, useEffect } from 'react';
import Tabs from "./Tabs";
import Mindfulness from "./Mindfulness";
import Affirmation from "./Affirmation";
import { useCustomState } from './state';

function App() {

  const { state, setSelectedWaveHand, setHandChoicesAsString } = useCustomState();

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
          <h1>{"I can take up space"}</h1>
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
            {/*See ya later, <em>Alligator</em> {state.selectedWaveHand}!*/}
            <Affirmation />
          </div>

          <div label="nametag">
            After 'while, <em>Crocodile</em>!
          </div>
          <div label="mindfulness">
            {/*Nothing to see here, this tab is <em>extinct</em>!*/}
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
