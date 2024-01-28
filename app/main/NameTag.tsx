import React, { useEffect, useState } from 'react';
// import RefreshAPIs from './RefreshAPIs';
import Switch from '@mui/material/Switch';
import { alpha, styled } from '@mui/material/styles';
import { nametags, hands } from '../state';

function drawNametag(): ImageData {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d')!;
  canvas.width = 1600; // Width of the canvas
  canvas.height = 900; // Height of the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  if (localStorage.getItem('showNametag') === 'true') {

    context.fillStyle = 'white'; 
    context.roundRect(780, 550, 505, 170, 20);
    context.fill();

    context.strokeStyle = '#FFD700'; 

    context.lineWidth = 9;

    // Draw the line
    context.beginPath();
    context.moveTo(790, 570); // Starting point of the line
    context.lineTo(790, 710); // Ending point of the line
    context.stroke(); // Apply the stroke

    context.font = '40px Arial';
    context.fillStyle = 'black';

    const inputValues = nametags.getCurrentNametag();

    if (inputValues[1] !== '') {
      context.fillText(inputValues[0] + ' (' + inputValues[1] + ')', 800, 600 + 0 * 50);
    } else {
      context.fillText(inputValues[0], 800, 600 + 0 * 50);
    }
    context.font = '30px Arial';
    context.fillText(inputValues[2], 800, 600 + 1 * 50);

    context.font = '40px Arial';
    context.fillText(inputValues[3], 800, 600 + 2 * 50);
  }


  const indexDataRaw = hands.getCurrentHand();
  const indexData = (indexDataRaw !== null) ? JSON.parse(indexDataRaw) : null;

  if (indexData !== null) {
    const waveHandsDataRaw = hands.getHandChoicesAsString();
    const waveHandsData = (waveHandsDataRaw !== null) ? JSON.parse(waveHandsDataRaw) : null;

    context.font = '50px Arial'; // Font size and style
    context.fillStyle = 'black'; // Text color

    const out = waveHandsData[indexData]; // Access the selected value

    const textLength = out.length;
    context.fillStyle = '#d68071'; // Set the background color to white
    context.roundRect(60, 70, textLength * 15 + 80, 100, 30);
    context.fill();
    context.fillStyle = 'white'; // White text color

    context.font = 'bold 80px Arial'; // Larger font size
    context.fillText(out.substring(0, 3), 70, 150); // Draw the first character
    context.font = 'bold 30px Arial';
    context.fillText(out.substring(3), 160, 130);

  }

  const newImageData = context.getImageData(0, 0, canvas.width, canvas.height);
  return newImageData;
}

const NameTag: React.FC = () => {
  const [inputValues, setInputValues] = useState(nametags.getCurrentNametag());
  const [showNametag, setShowNametag] = useState(false);
  const [imageData, setImageData] = useState<ImageData | null>(null);

  useEffect(() => {
    nametags.setNametagStatus(JSON.stringify(showNametag));
    nametags.setCurrentNametag(inputValues);

    const newImageData = drawNametag();
    setImageData(newImageData);
  }, [showNametag, inputValues]);

  // const handleNametag = () => {
  //   setShowNametag(!showNametag);
  // };

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
        <h2 style={{ fontSize: '30px', fontWeight: 'bold', display: 'inline-block' }}>Name Tag</h2>
        <ColoredSwitch
          role='switch'
          data-testid = 'colored-switch'
          aria-checked={showNametag}
          checked={showNametag}
          onChange={() => setShowNametag(!showNametag)}
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
};

export { drawNametag };

export default NameTag;
