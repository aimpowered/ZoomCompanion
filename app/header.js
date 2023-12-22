
import React, { useState, useEffect } from 'react';
import { drawNametag } from './nametag';
import RefreshAPIs from './RefreshAPIs';
import zoomSdk from "@zoom/appssdk";

const Header = () => {

  async function configureSdk() {
    try {
      const configResponse = await zoomSdk.config({
        capabilities: [
          "setVirtualForeground",
          "removeVirtualForeground"

        ],
        version: "0.16.0",
      });
      console.log("App configured", configResponse);
      setRunningContext(configResponse.runningContext);

      setUserContextStatus(configResponse.auth.status);

      const userContext = await zoomSdk.invoke("getUserContext");
      setUser(userContext);
    } catch (error) {
      console.log('zoom sdk not loaded')
    }
  }

  useEffect(() => {
    configureSdk();
  }, []);

  const [imageData, setImageData] = useState(null);

  const header_title = localStorage.getItem('title') || 'Say what I want to say, whatever happens will help me grow';

  const initialWaveHands = [
    '👋',
    '👋 I\'m not done',
    '👋 Question',
    '👋 Agree',
    '👋 Different Opinion',
    '👋 Support',
  ];

  const [waveHands, setWaveHands] = useState(() => {
    const localStorageData = localStorage.getItem('waveHands');
    return localStorageData ? JSON.parse(localStorageData) : initialWaveHands;
  });

  const [selectedWaveHand, setSelectedWaveHand] = useState(() => {
    const localStorageData = localStorage.getItem('selectedWaveHand');
    return localStorageData ? JSON.parse(localStorageData) : null;
  });

  const handleWaveHandsClick = (index) => {
    if (index === selectedWaveHand) {
      setSelectedWaveHand(null);
    }
    else {
      setSelectedWaveHand(index);
    }
  };


  useEffect(() => {
    localStorage.setItem('waveHands', JSON.stringify(waveHands));
  }, [waveHands]);

  useEffect(() => {
    localStorage.setItem('selectedWaveHand', selectedWaveHand);
    // window.dispatchEvent(new Event('storage'))
    const newImageData = drawNametag(localStorage.getItem('showNametag'), localStorage.getItem('selectedWaveHand'), localStorage.getItem('inputValues'));
    setImageData(newImageData);
  }, [selectedWaveHand]);


  return (
    <div className="header">
      <div className="self-confirm">
          <h1>{header_title}</h1>
      </div>

      <div className="button-rows">
          {waveHands.map((waveHand, index) => (
            <button
              key={index}
              className={`wave-hand-button ${
                selectedWaveHand === index ? 'selected' : ''
              }`}
              onClick={() => handleWaveHandsClick(index)}
            >
              {waveHand}
            </button>
          ))}
      </div>

      <RefreshAPIs imageData={imageData} />

    </div>

  );
};

export default Header;