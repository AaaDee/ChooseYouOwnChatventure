import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('renders content', () => {
  const mockCallBack = jest.fn();
  render(<Button content="hi!" onClick={mockCallBack} />);
  const element = screen.getByText(/hi!/);
  expect(element).toBeInTheDocument();
});

test('can be clicked', () => {
  const mockCallBack = jest.fn();
  render(<Button content="hi!" onClick={mockCallBack} />);
  screen.getByText(/hi!/).click();
  expect(mockCallBack).toBeCalled();
});
