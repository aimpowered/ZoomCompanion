import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../app/main/mindfulness'


jest.mock('next/navigation', () => jest.requireActual('next-router-mock'))
jest.mock('../lib/zoomapi', () => jest.requireActual('../lib/fakezoomapi'));

describe('Page', () => {
  it('renders a heading and two videos', () => {
    render(<Page />)


    const video1 = screen.getByLabelText('youtube-video-1');
    expect(video1).toBeInTheDocument();
    
    const video2 = screen.getByLabelText('youtube-video-2');
    expect(video2).toBeInTheDocument();
  })

  it('renders two correct videos', () => {
    render(<Page />)

    const youtube1ID = 'SD6dPo98dWw'
    const youtube2ID = '90mqR3A9Pno'

    const video1 = screen.getByLabelText('youtube-video-1');
    expect(video1).toHaveAttribute('src', expect.stringContaining(youtube1ID));

    const video2 = screen.getByLabelText('youtube-video-2');
    expect(video2).toHaveAttribute('src', expect.stringContaining(youtube2ID));


  })

})
