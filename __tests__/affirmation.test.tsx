import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import Page from '../app/affirmation/page';
import { affirmations } from '../app/state';

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'));
jest.mock('../lib/zoomapi', () => jest.requireActual('../lib/fakezoomapi'));

// jest.mock('../app/state', () => ({
//   affirmations: {
//     getCurrentAffirmation: jest.fn(() => "test"),
//     setCurrentAffirmation: jest.fn(),
//     getAffirmationsAsString: jest.fn(),
//     setAffirmationsAsString: jest.fn(),
//   },
// }));

describe('Page', () => {
  it('renders a heading', () => {
    render(<Page />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('affirmation buttons existed in this page', () => {
    render(<Page />);
    const buttonTexts = [
      'I have an important voice',
      'Say what I want to say, whatever happens will help me grow',
      'I can take up space',
      'Feel the tension and proceed',
      'I have the right to stutter',
    ];

    buttonTexts.forEach((text) => {
      const button = screen.getByText(text);
      expect(button).toBeInTheDocument();
    });
  });

  it('press Apply button triggers setCurrentAffirmation', () => {
    render(<Page />);

    const dropdownButton = screen.getByText('I have an important voice');
    fireEvent.click(dropdownButton);
    const dropdown = within(dropdownButton.nextSibling);
    const applyButton = dropdown.getByText('Apply');

    const setCurrentAffirmationMock = jest.spyOn(affirmations, 'setCurrentAffirmation');
    fireEvent.click(applyButton);
    expect(setCurrentAffirmationMock).toHaveBeenCalled();
  });


  it('press Edit button opens a modal', () => {
    render(<Page />);

    const dropdownButton = screen.getByText('I have an important voice');
    fireEvent.click(dropdownButton);
    const dropdown = within(dropdownButton.nextSibling);
    const editButton = dropdown.getByText('Edit');

    fireEvent.click(editButton);
    const modal = screen.getByPlaceholderText('Edit text');
    expect(modal).toBeInTheDocument();
    
  });

});
