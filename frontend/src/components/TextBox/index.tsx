import React from 'react';
import { StyledTextBox } from './style';
import { ChoiceButton } from '../ChoiceButton';
import { ping } from '../../features/ping';
import { useSelector } from 'react-redux';
import { selectChoices } from '../../features/choices/selectors';

export function TextBox() {
  const choices = useSelector(selectChoices);
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
        <ChoiceButton
          key={choice.id}
          content={choice.content}
          onClick={onClick}
        />
      ))}
    </StyledTextBox>
  );
}
