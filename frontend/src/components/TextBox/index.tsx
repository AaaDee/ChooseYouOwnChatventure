import React from 'react';
import { StyledTextBox } from './style';
import { ChoiceButton } from '../ChoiceButton';
import { ping } from '../../features/ping';
import { Choice } from '../../types';

interface Props {
  choices: Choice[];
}

export function TextBox({ choices }: Props) {
  function onClick() {
    void (async () => {
      const resp = await ping();
      console.log(resp);
    })();
  }

  return (
    <StyledTextBox>
      <div>text</div>
      {choices.map((choice) => (
        <ChoiceButton content={choice.content} onClick={onClick} />
      ))}
    </StyledTextBox>
  );
}
