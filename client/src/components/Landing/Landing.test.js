import { fireEvent, render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import Landing from './Landing';
import { createMemoryHistory } from 'history';

describe('Landing Page', () => {
  test('Should route to /breeds', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] });
    const { getByText } = render(
      <Router history={history}>
        <Landing />
      </Router>
    );
    expect(history.location.pathname).toBe('/');
    fireEvent.click(getByText('Learn More'));
    expect(history.location.pathname).toBe('/breeds');
  });
});