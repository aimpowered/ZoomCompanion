// Under Review

import { useState } from 'react';

interface Button {
  id: number;
  text: string;
}

interface State {
  selectedAffirmation: string;
  allAffirmations: Button[];
}

const initialState: State = {
  selectedAffirmation: 'Say what I want to say, whatever happens will help me grow',
  allAffirmations: [
    { id: 1, text: 'Say what I want to say, whatever happens will help me grow' },
    { id: 2, text: 'I can take up space' },
    { id: 3, text: 'I have an important voice' },
    { id: 4, text: 'Feel the tension and proceed' },
    { id: 5, text: 'I have the right to stutter' },
  ],
};

export const useCustomState = () => {
  const [state, setState] = useState<State>(initialState);

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

  return {
    state,
    setCurrentAffirmation,
    setAllAffirmations,
  };
};
