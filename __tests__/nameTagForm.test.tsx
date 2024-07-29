import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { NameTagForm } from '@/components/NameTagForm';

const currentNameTag = {
  visible: false,
  fullName: "Test User",
  preferredName: "",
  pronouns: "",
  disclosure: "",
};
const updateNameTagContent = jest.fn();

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'))
jest.mock('../lib/zoomapi', () => jest.requireActual('../lib/fakezoomapi'));

describe('NameTagForm', () => {
  it('renders the heading and input fields', () => {

    render(
      <NameTagForm
        content={currentNameTag}
        onNameTagContentChange={updateNameTagContent}
      />
    );
    expect(screen.getByText('Full Name')).toBeInTheDocument();
    expect(screen.getByText('Preferred Name')).toBeInTheDocument();
    expect(screen.getAllByText('Pronouns')[0]).toBeInTheDocument();
    expect(screen.getByText('Self Disclosure')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  })

  it('verifies that the nametag display checkbox can be checked', async () => {

    render(
      <NameTagForm
        content={currentNameTag}
        onNameTagContentChange={updateNameTagContent}
      />
    );

    const element = screen.getByLabelText('Display Name Tag');
    expect(element).toBeInTheDocument();

    let checkboxInput = screen.getByRole('checkbox')

    expect(checkboxInput).toBe(element);
    
    expect(checkboxInput).not.toBeChecked();
    await userEvent.click(checkboxInput);
    expect(checkboxInput).toBeChecked();
  });
})
