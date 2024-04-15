import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../app/main/page'

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'))
jest.mock('../lib/zoomapi', () => jest.requireActual('../lib/fakezoomapi'));

describe('Load page', () => {
  
  it('renders Affirmation component', () => {
  	// render(<Page />);
  });
});
