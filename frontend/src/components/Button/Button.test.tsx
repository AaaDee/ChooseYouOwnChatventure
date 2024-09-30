import React from 'react';
import { test, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('renders content', () => {
  const mockCallBack = vi.fn();
  render(<Button onClick={mockCallBack}>hi!</Button>);
  const element = screen.getByText(/hi!/);
  expect(element).toBeInTheDocument();
});

test('can be clicked', () => {
  const mockCallBack = vi.fn();
  render(<Button onClick={mockCallBack}>hi!</Button>);
  screen.getByText(/hi!/).click();
  expect(mockCallBack).toBeCalled();
});
