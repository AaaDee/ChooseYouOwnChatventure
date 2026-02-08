import { useSelector } from 'react-redux';
import { selectChoices } from '../../features/entry/selectors';
import { OngoingView } from '../OngoingView/OngoingView';
import { StartView } from '../StartView/StartView';
import { StyledTextBox } from './style';

export function TextBox() {
  const choices = useSelector(selectChoices);
  const hasChoices = choices && choices.length > 0;

  console.log('Choices in component:', choices);

  return (
    <StyledTextBox>
      {!hasChoices && <StartView />}
      {hasChoices && <OngoingView />}
    </StyledTextBox>
  );
}
