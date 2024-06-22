import React from 'react';
import { render, screen } from '@testing-library/react';
import { Title } from '.';

test('renders title text', () => {
  render(<Title />);
  const element = screen.getByText(/Choose Your Own Chatventure/);
  expect(element).toBeInTheDocument();
});
