import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../app/mindfulness/page'

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'))
jest.mock('../lib/zoomapi', () => jest.requireActual('../lib/fakezoomapi'));

describe('Page', () => {
  it('renders a heading and two videos', () => {
    render(<Page />)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()

    const video1 = screen.getByTestId('youtube1-iframe');
    expect(video1).toBeInTheDocument();

    const video2 = screen.getByTestId('youtube2-iframe');
    expect(video2).toBeInTheDocument();

  })

  it('renders two correct videos', () => {
    render(<Page />)

    const youtube1ID = 'SD6dPo98dWw';
    const youtube2ID = '90mqR3A9Pno';

    const video1 = screen.getByTestId('youtube1-iframe');
    expect(video1).toHaveAttribute('src', expect.stringContaining(youtube1ID));

    const video2 = screen.getByTestId('youtube2-iframe');
    expect(video2).toHaveAttribute('src', expect.stringContaining(youtube2ID));


  })

})
