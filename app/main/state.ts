
import { useState } from 'react';

const initialState = {
  selectedWaveHand: 'null',
  waveHands:[
    '👋',
    '👋 I\'m not done',
    '👋 Question',
    '👋 Agree',
    '👋 Different Opinion',
    '👋 Support',
  ],
};

export const useCustomState = () => {
  const [state, setState] = useState(initialState);

  const setSelectedWaveHand = (newSelectedWaveHand: string) => {
    setState((prevState) => ({
      ...prevState,
      selectedWaveHand: newSelectedWaveHand,
    }));
  };

  const setHandChoicesAsString = (hands: string) => {
    setState((prevState) => ({
      ...prevState,
      waveHands: hands,
    }));
  };

  return { state, setSelectedWaveHand, setHandChoicesAsString };
};


// export const hands = {
//   getCurrentHand(): string | null {
//     const { state } = useCustomState();
//     return state.selectedWaveHand;
//   },

//   setCurrentHand(text: string) {
//     // Access the state update function to set the new value
//     const { setSelectedWaveHand } = useCustomState();
//     setSelectedWaveHand(text);
//   },

//   getHandChoicesAsString(): string|null {
//     const { state } = useCustomState();
//     return state.waveHands;
//   },


// };


