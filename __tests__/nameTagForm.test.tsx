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

    let checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach(checkbox => {
      expect(checkbox).toBeInTheDocument();
    })
  })

  it('verifies that the nametag display and send disclosure message checkboxes can be checked', async () => {

    render(
      <NameTagForm
        content={currentNameTag}
        onNameTagContentChange={updateNameTagContent}
      />
    );

    const displayNameTagCheckboxElement = screen.getByLabelText('Display Name Tag');
    expect(displayNameTagCheckboxElement).toBeInTheDocument();

    const sendDisclosureMessageCheckboxElement = screen.getByLabelText('Send Disclosure Message');
    expect(sendDisclosureMessageCheckboxElement).toBeInTheDocument();

    let checkboxes = screen.getAllByRole('checkbox');

    expect(checkboxes).toContain(displayNameTagCheckboxElement);
    expect(checkboxes).toContain(sendDisclosureMessageCheckboxElement);
    
    checkboxes.forEach(async (checkboxElement) => {
      expect(checkboxElement).not.toBeChecked();
      await userEvent.click(checkboxElement);
      expect(checkboxElement).toBeChecked();
    });
  });
})
