import React from 'react';
import { StyledTextBox } from './style';
import { ChoiceButton } from '../ChoiceButton';

export function TextBox() {
  return (
    <StyledTextBox>
      <div>text</div>
      <ChoiceButton content="test" onClick={() => console.log('click')} />
    </StyledTextBox>
  );
}
