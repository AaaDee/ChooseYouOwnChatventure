import React from 'react';
import { render, screen } from '@testing-library/react';
import { Title } from './Title';

test('renders title text', () => {
  render(<Title />);
  const linkElement = screen.getByText(/Choose Your Own Chatventure/);
  expect(linkElement).toBeInTheDocument();
});
