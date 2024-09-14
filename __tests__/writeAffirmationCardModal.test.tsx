import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { WriteAffirmationCardModal } from '@/components/WriteAffirmationCardModal';
import React from 'react';

const currentWriteAffirmationCardModalProps = {
    open: true,
    mockOnModalClose: jest.fn(),
    initialText: 'foo bar',
    mockOnCardSave: jest.fn()
};

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'));

describe('test the edit function of the Modal to the current affirmation card', () => {
    it('should render Modal correctly', () => {
        render(
            <WriteAffirmationCardModal
                open={currentWriteAffirmationCardModalProps.open}
                onModalClose={currentWriteAffirmationCardModalProps.mockOnModalClose}
                initialText={currentWriteAffirmationCardModalProps.initialText}
                onCardSave={currentWriteAffirmationCardModalProps.mockOnCardSave}
            />
        );

        expect(screen.getByDisplayValue('foo bar')).toBeTruthy();
        expect(screen.getByText('Save')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();

    });

    it('should take the input value and save', () => {
        render(
            <WriteAffirmationCardModal
                open={currentWriteAffirmationCardModalProps.open}
                onModalClose={currentWriteAffirmationCardModalProps.mockOnModalClose}
                initialText={currentWriteAffirmationCardModalProps.initialText}
                onCardSave={currentWriteAffirmationCardModalProps.mockOnCardSave}
            />
        );
        const textarea = screen.getByDisplayValue('foo bar');
        fireEvent.change(textarea, {target: {value: 'New Content'}});
        expect(screen.getByDisplayValue('New Content')).toBeTruthy();
        fireEvent.click(screen.getByText('Save'));
        expect(currentWriteAffirmationCardModalProps.mockOnCardSave).toHaveBeenCalledTimes(1);
    });

    it('should close the Modal when hit on Cancel', () => {
        render(
            <WriteAffirmationCardModal
                open={currentWriteAffirmationCardModalProps.open}
                onModalClose={currentWriteAffirmationCardModalProps.mockOnModalClose}
                initialText={currentWriteAffirmationCardModalProps.initialText}
                onCardSave={currentWriteAffirmationCardModalProps.mockOnCardSave}
            />
        );

        fireEvent.click(screen.getByText('Cancel'));
        expect(currentWriteAffirmationCardModalProps.mockOnModalClose).toHaveBeenCalledTimes(1);
    });
});