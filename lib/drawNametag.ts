// drawNametag.ts

export default function drawNametag(): ImageData {
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
