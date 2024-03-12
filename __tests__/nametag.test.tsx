import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import Page from '../app/main/page'

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'))
jest.mock('../lib/zoomapi', () => jest.requireActual('../lib/fakezoomapi'));

describe('Page', () => {
  it('renders the heading and input fields', () => {

    render(<Page />)
    expect(screen.getByText('Full Name')).toBeInTheDocument();
    expect(screen.getByText('Preferred Name')).toBeInTheDocument();
    expect(screen.getAllByText('Select Pronouns')[0]).toBeInTheDocument();
    expect(screen.getByText('Self Disclosure')).toBeInTheDocument();
  })

  it('toggles the nametag display on switch change', async () => {

    render(<Page />)

    const element = screen.getByLabelText('Name Tag');
    expect(element).toBeInTheDocument();

    let switchInput = screen.getByRole('checkbox')

    expect(switchInput).toBe(element);
    
    expect(switchInput).not.toBeChecked();
    await userEvent.click(switchInput);
    expect(switchInput).toBeChecked();
  });
})
