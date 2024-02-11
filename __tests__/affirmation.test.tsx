import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import Page from '../app/main/Affirmation'
import Affirmation from '../app/main/Affirmation';

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'));
jest.mock('../lib/zoomapi', () => jest.requireActual('../lib/fakezoomapi'));


const allAffirmations = [
  { id: 1, text: 'Affirmation 1' },
  { id: 2, text: 'Affirmation 2' },
  { id: 3, text: 'Affirmation 3' },
];
const setCurrentAffirmation = jest.fn();
const setAllAffirmations = jest.fn();

describe('Page', () => {

  it('affirmation buttons existed in this page', () => {

    render(
    <Affirmation
      allAffirmations={allAffirmations}
      setCurrentAffirmation={setCurrentAffirmation}
      setAllAffirmations={setAllAffirmations}
    />
    );

    const buttonTexts = [
      'Affirmation 1',
      'Affirmation 2',
      'Affirmation 3',
    ];

    buttonTexts.forEach((text) => {
      const button = screen.getByText(text);
      expect(button).toBeInTheDocument();
    });
  });

  it('press Apply button triggers setCurrentAffirmation', () => {
    render(
      <Affirmation
        allAffirmations={allAffirmations}
        setCurrentAffirmation={setCurrentAffirmation}
        setAllAffirmations={setAllAffirmations}
      />
    );

    const applyButtons = screen.getAllByText('Apply', { selector: 'button' });
    fireEvent.click(applyButtons[0]);
    
    expect(setCurrentAffirmation).toHaveBeenCalledTimes(1);
    expect(setCurrentAffirmation).toHaveBeenCalledWith('Affirmation 1');
  });


  // it('press Edit button, open and close a modal', () => {
  //   render(<Page />);

  //   const dropdownButton = screen.getByText('I can take up space');
  //   fireEvent.click(dropdownButton);
  //   const dropdown = within(dropdownButton.nextSibling);
  //   const editButton = dropdown.getByText('Edit');

  //   fireEvent.click(editButton);
  //   const modal = screen.getByPlaceholderText('Edit text');
  //   expect(modal).toBeInTheDocument();
  //   userEvent.type(modal, 'New text for testing');
  //   const saveButton = screen.getByText('Save');
  //   fireEvent.click(saveButton);
  //   expect(modal).not.toBeInTheDocument();

  // });

  // it('press Delete button', () => {
  //   render(<Page />);

  //   const dropdownButton = screen.getByText('I can take up space');
  //   fireEvent.click(dropdownButton);
  //   const dropdown = within(dropdownButton.nextSibling);
  //   const deleteButton = dropdown.getByText('Delete');
  //   fireEvent.click(deleteButton);

  //   expect(screen.queryByText('I can take up space')).not.toBeInTheDocument();
    
  // });


  // it('press new affirmation button, opens a modal', () => {
  //   render(<Page />);

  //   // TODO: add aria button to it to get rid of testID
  //   const addButtonElement = screen.getByTestId('add-button');
  //   fireEvent.click(addButtonElement);
  //   const modal = screen.getByPlaceholderText('Edit text');
  //   expect(modal).toBeInTheDocument();
  // });


});
