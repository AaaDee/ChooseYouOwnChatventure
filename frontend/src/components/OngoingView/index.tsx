import React from 'react';
import { useSelector } from 'react-redux';
import { selectChoices, selectContent } from '../../features/entry/selectors';
import { ChoiceButton } from '../ChoiceButton';
import { useOngoingRequest } from '../../hooks/useOngoingRequest';

export function OngoingView() {
  const choices = useSelector(selectChoices);
  const content = useSelector(selectContent);
  const requestOngoing = useOngoingRequest();

  if (!choices) {
    return null;
  }

  return (
    <>
      <div data-testid="ongoing_text">{content}</div>
      {choices.map((choice) => (
        <ChoiceButton
          key={choice.index}
          content={choice.content}
          onClick={requestOngoing(choice.index)}
        />
      ))}
    </>
  );
}
