import React from 'react';
import { useSelector } from 'react-redux';
import { selectChoices, selectContent } from '../../features/entry/selectors';
import { ChoiceButton } from '../ChoiceButton';

export function OngoingView() {
  const choices = useSelector(selectChoices);
  const content = useSelector(selectContent);
  function onClick() {
    console.log('ping!');
  }

  return (
    <>
      <div data-testid="ongoing_text">{content}</div>
      {choices.map((choice) => (
        <ChoiceButton
          key={choice.index}
          content={choice.content}
          onClick={onClick}
        />
      ))}
    </>
  );
}

