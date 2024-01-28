
const fakeLocalStorage = {
  getItem() {
    return null;
  },
  setItem() {},
};

const USE_LOCAL_STORAGE_IF_PRESENT = true;

const localStorage = (USE_LOCAL_STORAGE_IF_PRESENT && globalThis.localStorage) || fakeLocalStorage;


export const affirmations = {
  getCurrentAffirmation(): string {
    return localStorage.getItem('title') ?? "test";
  },

  setCurrentAffirmation(text: string) {
    localStorage.setItem('title', text);
  },

  getAffirmationsAsString(): string|null {
    return localStorage.getItem('buttons');
  },

  setAffirmationsAsString(affirmations: string) {
    localStorage.setItem('buttons', affirmations);
  },
};

export const hands = {
  getCurrentHand(): string|null {
    return localStorage.getItem('selectedWaveHand');
  },

  setCurrentHand(text: string) {
    localStorage.setItem('selectedWaveHand', text);
  },

  getHandChoicesAsString(): string|null {
    return localStorage.getItem('waveHands');
  },

  setHandChoicesAsString(hands: string) {
    localStorage.setItem('waveHands', hands);
  },
};


export const nametags = {
  getCurrentNametag(): string[] {
    const inputValues: string[] = [];
    for (let index = 0; index < 4; index++) {
        const key = `inputValue${index}`;
        const value = localStorage.getItem(key);
        if (value !== null) {
            inputValues.push(value);
        } else {
          inputValues.push('')
        }
    }
    return inputValues;
  },

  setCurrentNametag(inputValues: string[]) {
    inputValues.forEach((value, index) => {
        const key = `inputValue${index}`;
        localStorage.setItem(key, value);
    });
  },

  getNametagStatus(): string|null {
    return localStorage.getItem('showNametag');
  },

  setNametagStatus(showNametag: string) {
    localStorage.setItem('showNametag', showNametag);
  },
};
