import { useState } from 'react';

interface Button {
  id: number;
  text: string;
}

interface State {
  selectedWaveHand: number | null;
  waveHands: string[];
  selectedAffirmation: string;
  allAffirmations: Button[];
  currentNameTag: string[]
  nameTagStatus: boolean;
}

const initialState: State = {
  selectedWaveHand: null,
  waveHands: [
    '👋',
    '👋 I\'m not done',
    '👋 Question',
    '👋 Agree',
    '👋 Different Opinion',
    '👋 Support',
  ],
  selectedAffirmation: 'Say what I want to say, whatever happens will help me grow',
  allAffirmations: [
    { id: 1, text: 'Say what I want to say, whatever happens will help me grow' },
    { id: 2, text: 'I can take up space' },
    { id: 3, text: 'I have an important voice' },
    { id: 4, text: 'Feel the tension and proceed' },
    { id: 5, text: 'I have the right to stutter' },
  ],

  currentNameTag: ['', '', '', ''],
  nameTagStatus:false,
};

export const useCustomState = () => {
  const [state, setState] = useState<State>(initialState);

  const setSelectedWaveHand = (newSelectedWaveHand: number) => {
    setState((prevState) => ({
      ...prevState,
      selectedWaveHand: prevState.selectedWaveHand === newSelectedWaveHand ? null : newSelectedWaveHand,
    }));
  };


  // const setHandChoicesAsString = (hands: string[]) => {
  //   setState((prevState) => ({
  //     ...prevState,
  //     waveHands: hands,
  //   }));
  // };

  const setCurrentAffirmation = (newAffirmation: string) => {
    setState((prevState) => ({
      ...prevState,
      selectedAffirmation: newAffirmation,
    }));
  };

  const setAllAffirmations = (affirmations: Button[]) => {
    setState((prevState) => ({
      ...prevState,
      allAffirmations: affirmations,
    }));
  };

  const setCurrentNameTag = (newNametag: string[]) => {
    setState((prevState) => {
      // Check if the new value is different before updating state
      if (JSON.stringify(prevState.currentNameTag) !== JSON.stringify(newNametag)) {
        return {
          ...prevState,
          currentNameTag: newNametag,
        };
      }
      return prevState;
    });

    // console.log(newNametag);
  };

  const setNameTagStatus = (newNameTagStatus: boolean) => {
    setState((prevState) => {
      // Check if the new value is different before updating state
      if (prevState.nameTagStatus !== newNameTagStatus) {
        return {
          ...prevState,
          nameTagStatus: newNameTagStatus,
        };
      }
      return prevState;
    });
  };

  return {
    state,
    setSelectedWaveHand,
    setCurrentAffirmation,
    setAllAffirmations,
    setCurrentNameTag,
    setNameTagStatus
  };
};
