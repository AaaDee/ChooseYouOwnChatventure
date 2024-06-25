import React from 'react';
import { useSelector } from 'react-redux';
import { selectChoices } from '../../features/choices/selectors';
import { ChoiceButton } from '../ChoiceButton';

export function OngoingView() {
  const choices = useSelector(selectChoices);
  function onClick() {
    console.log('ping!');
  }

  return (
    <>
      <div data-testid="ongoing_text">text</div>
      {choices.map((choice) => (
        <ChoiceButton
          key={choice.id}
          content={choice.content}
          onClick={onClick}
        />
      ))}
    </>
  );
}
