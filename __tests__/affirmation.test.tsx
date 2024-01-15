import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../app/affirmation/page'

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'))
jest.mock('../lib/zoomapi', () => jest.requireActual('../lib/fakezoomapi'));

describe('Page', () => {
  it('renders a heading', () => {
    render(<Page />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })

  it('affirmation buttons existed in this page', () => {
    render(<Page />)
    const buttonTexts = [
      'I have an important voice',
      'Say what I want to say, whatever happens will help me grow',
      'I can take up space',
      'Feel the tension and proceed',
      'I have the right to stutter',
    ];

    buttonTexts.forEach((text) => {
      const button = screen.getByText(text);
      expect(button).toBeInTheDocument();
    });
  })


})
