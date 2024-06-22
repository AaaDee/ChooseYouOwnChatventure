import React from 'react';
import { render, screen } from '@testing-library/react';
import { ChoiceButton } from '.';

test('renders content', () => {
  const mockCallBack = jest.fn();
  render(<ChoiceButton content="hi!" onClick={mockCallBack} />);
  const element = screen.getByText(/hi!/);
  expect(element).toBeInTheDocument();
});

test('can be clicked', () => {
  const mockCallBack = jest.fn();
  render(<ChoiceButton content="hi!" onClick={mockCallBack} />);
  screen.getByText(/hi!/).click();
  expect(mockCallBack).toBeCalled();
});
