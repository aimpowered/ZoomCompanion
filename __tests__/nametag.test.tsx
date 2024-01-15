import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Page from '../app/nametag/page'

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'))
jest.mock('../lib/zoomapi', () => jest.requireActual('../lib/fakezoomapi'));

describe('Page', () => {
  it('renders the heading and input fields', () => {
    render(<Page />)

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByText('Full Name')).toBeInTheDocument();
    expect(screen.getByText('Preferred Name')).toBeInTheDocument();
    expect(screen.getAllByText('Select Pronouns')[0]).toBeInTheDocument();
    expect(screen.getByText('Self Disclosure')).toBeInTheDocument();
  })

  it('toggles the nametag display on switch change', () => {
    render(<Page />)

    let switchInput = screen.getByTestId('colored-switch');
    expect(switchInput).not.toBeChecked();

    // fireEvent.change(switchInput, { target: { 'aria-checked': true } });
    userEvent.click(switchInput);
    expect(switchInput).toBeChecked();
  });
})
