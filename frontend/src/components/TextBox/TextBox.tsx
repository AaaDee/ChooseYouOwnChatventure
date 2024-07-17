import React from 'react';
import { StyledTextBox } from './style';
import { useSelector } from 'react-redux';
import { selectChoices } from '../../features/entry/selectors';
import { StartView } from '../StartView/StartView';
import { OngoingView } from '../OngoingView/OngoingView';

export function TextBox() {
  const choices = useSelector(selectChoices);
  const hasChoices = choices && choices.length > 0;

  return (
    <StyledTextBox>
      {!hasChoices && <StartView />}
      {hasChoices && <OngoingView />}
    </StyledTextBox>
  );
}
