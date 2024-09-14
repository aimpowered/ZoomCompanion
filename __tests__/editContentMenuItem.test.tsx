import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { EditContentMenuItem } from '@/components/EditContentMenuItem';


const currentEditContentMenuItemProps = {
    id: 1,
    initialText: 'foo bar',
    mockOnCardEdit: jest.fn()
};

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'));

describe('Edit affirmation card content from the drop down menu', () => {
    it('should render the content successfully', () => {
        render(
            <EditContentMenuItem
                id={currentEditContentMenuItemProps.id}
                initialText={currentEditContentMenuItemProps.initialText}
                onCardEdit={currentEditContentMenuItemProps.mockOnCardEdit}
            /> 
        );
        expect(screen.getByText('Edit')).toBeInTheDocument();
        expect(screen.queryByText('Save')).toBeNull();
    });

    it('should render Edit Dialogue', () => {
        render(
            <EditContentMenuItem
                id={currentEditContentMenuItemProps.id}
                initialText={currentEditContentMenuItemProps.initialText}
                onCardEdit={currentEditContentMenuItemProps.mockOnCardEdit}
            /> 
        );

        fireEvent.click(screen.getByText('Edit'));
        expect(screen.getByText('Save')).toBeTruthy();
        expect(screen.getByText('Cancel')).toBeTruthy();
        expect(screen.getByDisplayValue('foo bar')).toBeInTheDocument();

    });

    it('should close the Modal when hit on Cancel', () => {
        render(
            <EditContentMenuItem
                id={currentEditContentMenuItemProps.id}
                initialText={currentEditContentMenuItemProps.initialText}
                onCardEdit={currentEditContentMenuItemProps.mockOnCardEdit}
            /> 
        );

        fireEvent.click(screen.getByText('Edit'));
        fireEvent.click(screen.getByText('Cancel'));
        expect(screen.queryByText('Cancel')).toBeNull();
    });

    it('should call the save function after clicking on save', () => {
        render(
            <EditContentMenuItem
                id={currentEditContentMenuItemProps.id}
                initialText={currentEditContentMenuItemProps.initialText}
                onCardEdit={currentEditContentMenuItemProps.mockOnCardEdit}
            /> 
        );

        fireEvent.click(screen.getByText('Edit'));        
        fireEvent.click(screen.getByText('Save'));
        expect(currentEditContentMenuItemProps.mockOnCardEdit).toHaveBeenCalledTimes(1);
        expect(screen.queryByText('Save')).toBeNull();
    });
});