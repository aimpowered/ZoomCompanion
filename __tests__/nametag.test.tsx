import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import NameTag from '../app/main/NameTag'

const currentNameTag = ['', '', '', ''];
const nameTagStatus = false;
const setCurrentNameTag = jest.fn();
const setNameTagStatus = jest.fn();
const selectedWaveHand = null;
const waveHands = [];


jest.mock('next/navigation', () => jest.requireActual('next-router-mock'))
jest.mock('../lib/zoomapi', () => jest.requireActual('../lib/fakezoomapi'));

describe('Page', () => {
  it('renders the heading and input fields', () => {
    render(
      <NameTag
        currentNameTag={currentNameTag}
        nameTagStatus={nameTagStatus}
        setCurrentNameTag={setCurrentNameTag}
        setNameTagStatus={setNameTagStatus}
        selectedWaveHand={selectedWaveHand}
        waveHands={waveHands}
      />
    );
    expect(screen.getByText('Full Name')).toBeInTheDocument();
    expect(screen.getByText('Preferred Name')).toBeInTheDocument();
    expect(screen.getAllByText('Select Pronouns')[0]).toBeInTheDocument();
    expect(screen.getByText('Self Disclosure')).toBeInTheDocument();
  })

  it('toggles the nametag display on switch change', async () => {
    render(
      <NameTag
        currentNameTag={currentNameTag}
        nameTagStatus={nameTagStatus}
        setCurrentNameTag={setCurrentNameTag}
        setNameTagStatus={setNameTagStatus}
        selectedWaveHand={selectedWaveHand}
        waveHands={waveHands}
      />
    );

    let switchInput = screen.getByRole('switch')
    expect(switchInput).not.toBeChecked();
    await userEvent.click(switchInput);
    expect(switchInput).toBeChecked();
  });
})
