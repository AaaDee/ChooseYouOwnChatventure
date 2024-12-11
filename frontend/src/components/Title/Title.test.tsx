import React from 'react';
import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Title } from './Title';

test('renders title text', () => {
  render(<Title />);
  const element = screen.getByText(/Choose Your Own Chatventure/);
  expect(element).toBeInTheDocument();
});
