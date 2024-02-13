import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../app/main/Mindfulness'


jest.mock('next/navigation', () => jest.requireActual('next-router-mock'))
jest.mock('../lib/zoomapi', () => jest.requireActual('../lib/fakezoomapi'));

describe('Page', () => {
  it('renders a heading and three videos', () => {
    render(<Page />)


    const video1 = screen.getByLabelText('youtube-video-1');
    expect(video1).toBeInTheDocument();
    
    const video2 = screen.getByLabelText('youtube-video-2');
    expect(video2).toBeInTheDocument();

    const video2 = screen.getByLabelText('youtube-video-3');
    expect(video2).toBeInTheDocument();
  })

  it('renders three correct videos', () => {
    render(<Page />)

    const youtube1ID = 'AKN_gbj8UtU'
    const youtube2ID = 'c7IkEhKtUwI'
    const youtube3ID = 'sG69_omRCyo'

    const video1 = screen.getByLabelText('youtube-video-1');
    expect(video1).toHaveAttribute('src', expect.stringContaining(youtube1ID));

    const video2 = screen.getByLabelText('youtube-video-2');
    expect(video2).toHaveAttribute('src', expect.stringContaining(youtube2ID));

    const video2 = screen.getByLabelText('youtube-video-3');
    expect(video2).toHaveAttribute('src', expect.stringContaining(youtube2ID));

  })

})
