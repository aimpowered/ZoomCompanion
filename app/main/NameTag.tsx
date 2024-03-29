// Under Review

import React, { useEffect, useState } from 'react';
import Switch from '@mui/material/Switch';
import drawNametag, { NameTagBadge, HandWaveBadge } from "@/lib/drawNametag";
import debounce from 'lodash/debounce';
import FormControlLabel from '@mui/material/FormControlLabel';

import { createFromConfig, ZoomApiWrapper } from "@/lib/zoomapi";
import { ConfigOptions }  from "@zoom/appssdk";

import '../css/NameTag.css'; // Import CSS file

type Apis = "setVirtualForeground" | "removeVirtualForeground"
const apiList: Apis[] = [
  "setVirtualForeground",
  "removeVirtualForeground",
];


interface NameTagProps {
  currentNameTag: string[];
  nameTagStatus: boolean;
  setCurrentNameTag: (newNametag: string[]) => void;
  setNameTagStatus: (newNameTagStatus: boolean) => void;
  selectedWaveHand: number | null;
  waveHands: string[];
}

function NameTag({
  currentNameTag,
  nameTagStatus,
  setCurrentNameTag,
  setNameTagStatus,
  selectedWaveHand,
  waveHands,
  }: NameTagProps) {
  const [inputValues, setInputValues] = useState(currentNameTag);
  const [showNametag, setShowNametag] = useState(nameTagStatus);

  
  const debouncedEffect = debounce(() => {
    setNameTagStatus(showNametag);
    setCurrentNameTag(inputValues);

    const nametag: NameTagBadge = {
        visible: showNametag,
        fullName: inputValues[0],
        preferredName: inputValues[1],
        pronouns: inputValues[2],
        disclosure: inputValues[3],
    };

    const handWave: HandWaveBadge =
       selectedWaveHand !== null ?
           {visible: true, waveText: waveHands[selectedWaveHand]} :
           {visible: false};

    const imageData = drawNametag(nametag, handWave);

    console.log(selectedWaveHand)
    const configOptions: ConfigOptions = {
      capabilities: apiList
    };
    const zoomApiInstance: ZoomApiWrapper = createFromConfig(configOptions);

    if (imageData) {
      zoomApiInstance.setVirtualForeground(imageData);
    } else {
      zoomApiInstance.removeVirtualForeground();
    }
  }, 1000, { trailing: true });

  useEffect(() => {
    debouncedEffect();
    return debouncedEffect.cancel;
  }, [showNametag, inputValues, selectedWaveHand, waveHands]);

  const handleInputChange = (index: number, value: string) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  }

  return (
    <div className="name-tag-container">
      <div>
        <FormControlLabel 
          control={
            <Switch
              className="colored-switch"
              onChange={() => setShowNametag(!showNametag)}
              checked={showNametag}
            />}
          label={<span className="label-text">Name Tag</span>}
          labelPlacement = 'start'
        />

      </div>
      <div className="input-field">
        <label>Full Name </label>
        <input
          type="text"
          className="text-input"
          value={inputValues[0]}
          onChange={(e) => handleInputChange(0, e.target.value)}
        />
      </div>
      <div className="block-style"></div>

      <div className="input-field">
        <label>Preferred Name </label>
        <input
          type="text"
          className="text-input"
          value={inputValues[1]}
          onChange={(e) => handleInputChange(1, e.target.value)}
        />
      </div>
      <div className="block-style"></div>

      <div className="input-field">
        <label>Select Pronouns</label>
        <select
          value={inputValues[2]}
          onChange={(e) => handleInputChange(2, e.target.value)}
          className="select-input"
        >
          <option value="">Select Pronouns</option>
          <option value="He/Him">He/Him</option>
          <option value="She/Her">She/Her</option>
          <option value="They/Them">They/Them</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="block-style"></div>

      <div className="input-field">
        <label>Self Disclosure </label>
        <input
          type="text"
          className="text-input"
          value={inputValues[3]}
          onChange={(e) => handleInputChange(3, e.target.value)}
        />
      </div>
      <div className="block-style"></div>


    </div>
  );
}

export default NameTag;
