"use client";

import React, { useState, useEffect } from 'react';
import { affirmations, hands } from '../state';
import Tabs from "./Tabs";

function App() {

  const initialWaveHands: string[] = [
    '👋',
    '👋 I\'m not done',
    '👋 Question',
    '👋 Agree',
    '👋 Different Opinion',
    '👋 Support',
  ];

  const [waveHands, _setWaveHands] = useState<string[]>(() => {
    const localStorageData = hands.getHandChoicesAsString();
    return localStorageData ? JSON.parse(localStorageData) : initialWaveHands;
  });

  const [selectedWaveHand, setSelectedWaveHand] = useState<number | null>(() => {
    const localStorageData = hands.getCurrentHand();
    return localStorageData ? JSON.parse(localStorageData) : null;
  });

  const handleWaveHandsClick = (text: string) => {
    hands.setCurrentHand(text);
  };

  return (
    <div>
      <div className="header">
        <div className="self-confirm">
          <h1>{"I can take up space"}</h1>
        </div>
      </div>

      <div className="button-rows">
        {waveHands.map((waveHand, index) => (
          <button
            key={index}
            className={`wave-hand-button ${selectedWaveHand === index ? 'selected' : ''}`}
            onClick={() => handleWaveHandsClick(index)}
          >
            {waveHand}
          </button>
        ))}
      </div>

      <div>
        <Tabs>
          <div label="affirmation">
            See ya later, <em>Alligator</em>!
          </div>
          <div label="nametag">
            After 'while, <em>Crocodile</em>!
          </div>
          <div label="mindfulness">
            Nothing to see here, this tab is <em>extinct</em>!
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
