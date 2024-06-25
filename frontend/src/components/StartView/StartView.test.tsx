import React from 'react';
import { render, screen } from '@testing-library/react';
import { StartView } from '.';

test('renders text', () => {
  render(<StartView />);
  const element = screen.getByText(/Start your journey/);
  expect(element).toBeInTheDocument();
});
