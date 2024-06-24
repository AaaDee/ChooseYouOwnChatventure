import React from 'react';
import { StyledTextBox } from './style';
import { ChoiceButton } from '../ChoiceButton';
import { ping } from '../../features/ping';

export function TextBox() {
  function onClick() {
    void (async () => {
      const resp = await ping();
      console.log(resp);
    })();
  }

  return (
    <StyledTextBox>
      <div>text</div>
      <ChoiceButton content="test" onClick={onClick} />
    </StyledTextBox>
  );
}
