import React from 'react';
import { StyledTextBox } from './style';
import { useSelector } from 'react-redux';
import { selectChoices } from '../../features/choices/selectors';
import { StartView } from '../StartView';
import { OngoingView } from '../OngoingView';

export function TextBox() {
  const choices = useSelector(selectChoices);
  const hasChoices = choices.length > 0;

  return (
    <StyledTextBox>
      {!hasChoices && <StartView />}
      {hasChoices && <OngoingView />}
    </StyledTextBox>
  );
}
