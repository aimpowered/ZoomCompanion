// Under Review

import React, { useEffect, useState } from 'react';
import Switch from '@mui/material/Switch';
import { alpha, styled } from '@mui/material/styles';
import drawNametag, { NameTagBadge, HandWaveBadge } from "@/lib/drawNametag";
import debounce from 'lodash/debounce';
import FormControlLabel from '@mui/material/FormControlLabel';

import { createFromConfig, ZoomApiWrapper } from "@/lib/zoomapi";
import { ConfigOptions }  from "@zoom/appssdk";

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

  const blockStyle: React.CSSProperties = {
    height: '20px', // Adjust the height value to control the spacing
  };

  const ColoredSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: '#d68071', // Set the color using a hex value
      '&:hover': {
        backgroundColor: alpha('#d68071', theme.palette.action.hoverOpacity), // Set the hover color using a hex value
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: '#d68071', // Set the track color using a hex value
    },
  }));

  return (
    <div style={{ marginLeft: '20px', marginRight: '20px' }}>
      <div>
        <FormControlLabel 
          control={
            <ColoredSwitch
              inputProps={{
                role: 'switch',
                onChange: () => setShowNametag(!showNametag)
              }}
              checked={showNametag}
            />}
          label={<span style={{ fontWeight: 'bold', fontSize: '30px' }}>Name Tag</span>}
          labelPlacement = 'start'
        />

      </div>
      <div>
        <label>Full Name </label>
        <input
          type="text"
          className="border border-gray-300 rounded-lg p-2 w-1/3"
          value={inputValues[0]}
          onChange={(e) => handleInputChange(0, e.target.value)}
        />
      </div>
      <div style={blockStyle}></div>

      <div>
        <label>Preferred Name </label>
        <input
          type="text"
          className="border border-gray-300 rounded-lg p-2 w-1/3"
          value={inputValues[1]}
          onChange={(e) => handleInputChange(1, e.target.value)}
        />
      </div>
      <div style={blockStyle}></div>

      <div>
        <label>Select Pronouns</label>
        <select
          value={inputValues[2]}
          onChange={(e) => handleInputChange(2, e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-1/3"
        >
          <option value="">Select Pronouns</option>
          <option value="He/Him">He/Him</option>
          <option value="She/Her">She/Her</option>
          <option value="They/Them">They/Them</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div style={blockStyle}></div>

      <div>
        <label>Self Disclosure </label>
        <input
          type="text"
          className="border border-gray-300 rounded-lg p-2 w-1/3"
          value={inputValues[3]}
          onChange={(e) => handleInputChange(3, e.target.value)}
        />
      </div>
      <div style={blockStyle}></div>


    </div>
  );
}

export default NameTag;
