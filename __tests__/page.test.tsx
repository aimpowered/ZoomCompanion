import '@testing-library/jest-dom'
import { render, screen, act } from '@testing-library/react'
import Page from '../app/main/page'
import { debug } from 'jest-preview';
// import ZoomApiWrapper from '../lib/fakezoomapi';


jest.mock('next/navigation', () => jest.requireActual('next-router-mock'))
jest.mock('../lib/zoomapi', () => jest.requireActual('../lib/fakezoomapi'));

describe('Load page', () => {
  
  it('renders Affirmation component', () => {
    render(<Page />);

    act(() => {
      const firstButtonListItem = document.querySelector('.wave-hand-button');

      if (firstButtonListItem) {
        firstButtonListItem.click();
        // expect(ZoomApiWrapper.setVirtualForeground).toHaveBeenCalled();
      } else {
        console.error('No element with class tab-list-item found.');
      }
    });

  });
});
