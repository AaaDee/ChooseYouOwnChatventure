import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('renders content', () => {
  const mockCallBack = jest.fn();
  render(<Button onClick={mockCallBack}>hi!</Button>);
  const element = screen.getByText(/hi!/);
  expect(element).toBeInTheDocument();
});

test('can be clicked', () => {
  const mockCallBack = jest.fn();
  render(<Button onClick={mockCallBack}>hi!</Button>);
  screen.getByText(/hi!/).click();
  expect(mockCallBack).toBeCalled();
});
