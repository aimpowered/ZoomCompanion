import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { within } from '@testing-library/dom';
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


  it('press Edit button, open and close a modal', () => {
    render(
      <Affirmation
        allAffirmations={allAffirmations}
        setCurrentAffirmation={setCurrentAffirmation}
        setAllAffirmations={setAllAffirmations}
      />
    );

    const dropdownButton = screen.getByText('Affirmation 1');
    fireEvent.click(dropdownButton);
    const dropdown = within(dropdownButton.nextSibling);
    const editButton = dropdown.getByText('Edit');

    fireEvent.click(editButton);
    const modal = screen.getByPlaceholderText('Edit text');
    expect(modal).toBeInTheDocument();
    fireEvent.change(modal, { target: { value: 'New text for testing' } });
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);
    expect(modal).not.toBeInTheDocument();

    const modified_button = screen.getByText('New text for testing');
    expect(modified_button).toBeInTheDocument();
  });

  it('press Delete button', () => {
    render(
      <Affirmation
        allAffirmations={allAffirmations}
        setCurrentAffirmation={setCurrentAffirmation}
        setAllAffirmations={setAllAffirmations}
      />
    );

    const dropdownButton = screen.getByText('Affirmation 1');
    fireEvent.click(dropdownButton);
    const dropdown = within(dropdownButton.nextSibling);
    const deleteButton = dropdown.getByText('Delete');
    fireEvent.click(deleteButton);

    expect(screen.queryByText('Affirmation 1')).not.toBeInTheDocument();
    
  });


  it('press new affirmation button, opens a modal, and save new affirmation', () => {
    render(
      <Affirmation
        allAffirmations={allAffirmations}
        setCurrentAffirmation={setCurrentAffirmation}
        setAllAffirmations={setAllAffirmations}
      />
    );

    const addButtonElement = screen.getByLabelText('New Affirmation');
    fireEvent.click(addButtonElement);
    const modal = screen.getByPlaceholderText('Edit text');
    expect(modal).toBeInTheDocument();

    fireEvent.change(modal, { target: { value: 'New Affirmation' } });
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    const modified_button = screen.getByText('New Affirmation');
    expect(modified_button).toBeInTheDocument();
  });


});
