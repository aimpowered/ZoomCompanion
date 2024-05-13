import { ZoomApiWrapper }  from "@/lib/zoomapi";

export interface EnabledNameTagBadge {
  visible: boolean;
  fullName: string;
  preferredName: string;
  pronouns: string;
  disclosure: string;
}
interface DisabledBadge {
  visible: false
}
interface EnabledHandWaveBadge {
  visible: true;
  waveText: string;
}
export type NameTagBadge = DisabledBadge | EnabledNameTagBadge;
export type HandWaveBadge = DisabledBadge | EnabledHandWaveBadge;

const DISABLED_BADGE = { visible: false } as const;

export class DrawBadgeApi {
  private nametag: NameTagBadge = DISABLED_BADGE;
  private handwave: HandWaveBadge = DISABLED_BADGE;
  private videoWidth: number = 1600;
  private videoHeight: number = 900;

  constructor(private zoomApiWrapper: ZoomApiWrapper) {}

  private forceDrawing() {
    const imageData = drawEverythingToImage(this.nametag, this.handwave, this.videoWidth, this.videoHeight);
    return this.zoomApiWrapper.setVirtualForeground(imageData);
  }

  drawNameTag(nametag: NameTagBadge) {
    this.nametag = nametag;
    return this.forceDrawing();
  }

  drawHandWave(handwave: HandWaveBadge) {
    this.handwave = handwave;
    return this.forceDrawing();
  }

  drawCameraSizeChange(videoWidth: number, videoHeight: number) {
    this.videoWidth = videoWidth;
    this.videoHeight = videoHeight;
    // console.log('it finally changed!!!!!!')
    // console.log(videoWidth, videoHeight)
    return this.forceDrawing();
  }
}

// TODO: make sure the imageData scale and resize correctly based on window size.
//       make need to make some more Zoom API calls to get user window size.
function drawEverythingToImage(nametag: NameTagBadge, handWave: HandWaveBadge, videoWidth: number, videoHeight: number): ImageData {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d')!;
  canvas.width = videoWidth; // Width of the canvas
  canvas.height = videoHeight; // Height of the canvas

  // Apply transformations to maintain proportions
  const xFactor = videoWidth / 1600;
  const yFactor = videoHeight / 900;

  // Calculate font size scaling factor
  const fontSizeFactor = Math.min(xFactor, yFactor);

  // Clear canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  if (nametag.visible) {
    context.fillStyle = 'white';
    context.roundRect(780 * xFactor, 550 * yFactor, 505 * xFactor, 170 * yFactor, 20 * xFactor);
    context.fill();

    context.strokeStyle = '#FFD700';
    context.lineWidth = 9 * xFactor;

    // Draw the line
    context.beginPath();
    context.moveTo(790 * xFactor, 570 * yFactor); // Starting point of the line
    context.lineTo(790 * xFactor, 710 * yFactor); // Ending point of the line
    context.stroke(); // Apply the stroke

    // Adjust font size based on the scaling factor
    context.font = `${40 * fontSizeFactor}px Arial`;
    context.fillStyle = 'black';

    // Adjust text positions
    const textX = 800 * xFactor;
    const textYOffset = 50 * yFactor;

    if (nametag.preferredName) {
      context.fillText(nametag.fullName + ' (' + nametag.preferredName + ')', textX, 600 * yFactor + 0 * textYOffset);
    } else {
      context.fillText(nametag.fullName, textX, 600 * yFactor + 0 * textYOffset);
    }
    context.font = `${30 * fontSizeFactor}px Arial`;
    context.fillText(nametag.pronouns, textX, 600 * yFactor + 1 * textYOffset);

    context.font = `${40 * fontSizeFactor}px Arial`;
    context.fillText(nametag.disclosure, textX, 600 * yFactor + 2 * textYOffset);
  }

  if (handWave.visible) {
    // Calculate font size scaling factor for hand wave badge
    const handWaveFontSizeFactor = Math.min(videoWidth / 1600, videoHeight / 900);

    context.font = `${50 * handWaveFontSizeFactor}px Arial`; // Font size and style
    context.fillStyle = 'black'; // Text color

    const textLength = handWave.waveText.length;
    context.fillStyle = '#d68071'; // Set the background color to white
    context.roundRect(60 * xFactor, 70 * yFactor, textLength * 15 * handWaveFontSizeFactor + 80 * xFactor, 100 * yFactor, 30 * xFactor);
    context.fill();
    context.fillStyle = 'white'; // White text color

    context.font = `bold ${80 * handWaveFontSizeFactor}px Arial`; // Larger font size
    context.fillText(handWave.waveText.substring(0, 3), 70 * xFactor, 150 * yFactor); // Draw the first character
    context.font = `bold ${30 * handWaveFontSizeFactor}px Arial`;
    context.fillText(handWave.waveText.substring(3), 160 * xFactor, 130 * yFactor);
  }

  const newImageData = context.getImageData(0, 0, canvas.width, canvas.height);
  return newImageData;
}
