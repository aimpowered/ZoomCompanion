import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { DeleteContentMenuItem } from '@/components/DeleteContentMenuItem';
import React from 'react';


const currentEditContentMenuItemProps = {
    id: 11,
    mockOnCardDeletion: jest.fn()
};

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'));

describe('Edit affirmation card content from the drop down menu', () => {
    it('should redner the content successfully', () => {
        render(
            <DeleteContentMenuItem
                id={currentEditContentMenuItemProps.id}
                onCardDeletion={currentEditContentMenuItemProps.mockOnCardDeletion}
            />
        );
        expect(screen.getByText('Delete')).toBeInTheDocument();
        expect(screen.getAllByRole('menuitem')).toHaveLength(1);
        expect(screen.queryByText('Confirm')).toBeNull();
    });


    it('should open the card deletion dialouge', () => {
        render(
            <DeleteContentMenuItem
                id={currentEditContentMenuItemProps.id}
                onCardDeletion={currentEditContentMenuItemProps.mockOnCardDeletion}
            />
        );
        expect(screen.queryByText('Confirm')).toBeNull();

        fireEvent.click(screen.getByText('Delete'));
        expect(screen.getByText('Confirm')).toBeTruthy();
    });

    it('should close the Modal compoenet after clicking cancel', () => {
        render(
            <DeleteContentMenuItem
                id={currentEditContentMenuItemProps.id}
                onCardDeletion={currentEditContentMenuItemProps.mockOnCardDeletion}
            />
        );

        expect(screen.queryByText('Cancel')).toBeNull();
        fireEvent.click(screen.getByText('Delete'));
        expect(screen.getByText('Cancel')).toBeTruthy();
        fireEvent.click(screen.getByText('Cancel'));
        expect(screen.queryByText('Cancel')).toBeNull();
    });

    it('should call onCardDeleteion and close Modal after clicking Confirm', () => {
        render(
            <DeleteContentMenuItem
                id={currentEditContentMenuItemProps.id}
                onCardDeletion={currentEditContentMenuItemProps.mockOnCardDeletion}
            />
        );

        expect(screen.queryByText('Confirm')).toBeNull();
        fireEvent.click(screen.getByText('Delete'));
        expect(screen.getByText('Confirm')).toBeTruthy();
        fireEvent.click(screen.getByText('Confirm'));
        expect(currentEditContentMenuItemProps.mockOnCardDeletion).toHaveBeenCalledTimes(1);
        expect(currentEditContentMenuItemProps.mockOnCardDeletion).toHaveBeenCalledWith(11)
        expect(screen.queryByText('Confirm')).toBeNull();
    });
});