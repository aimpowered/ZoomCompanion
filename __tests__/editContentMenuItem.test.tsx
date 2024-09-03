import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { EditContentMenuItem } from '@/components/EditContentMenuItem';


const currentEditContentMenuItemProps = {
    id: 1,
    initialText: 'foo bar',
    mockOnCardEdit: jest.fn()
};

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'));

describe('Edit affirmation card content from the drop down menu', () => {
    it('should redner the content successfully', () => {
        render(
            <EditContentMenuItem
                id={currentEditContentMenuItemProps.id}
                initialText={currentEditContentMenuItemProps.initialText}
                onCardEdit={currentEditContentMenuItemProps.mockOnCardEdit}
            /> 
        );
        expect(screen.getByText('Edit')).toBeInTheDocument();
        expect(screen.getAllByRole('menuitem')).toHaveLength(1);
    });
});