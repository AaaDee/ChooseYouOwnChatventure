import { useSelector } from 'react-redux';
import {
  selectChoices,
  selectContent,
  selectEntryOrImageLoading
} from '../../features/entry/selectors';
import { useOngoingRequest } from '../../hooks/useOngoingRequest';
import { Button } from '../Button/Button';

export function OngoingView() {
  const choices = useSelector(selectChoices);
  const content = useSelector(selectContent);
  const requestOngoing = useOngoingRequest();
  const entryOrImageIsLoading = useSelector(selectEntryOrImageLoading);

  // Fallback, shouldn't happen normally
  if (!choices) {
    return null;
  }

  return (
    <>
      <div data-testid="ongoing_text">{content}</div>
      {choices.map((choice) => (
        <Button
          key={choice.index}
          disabled={entryOrImageIsLoading}
          onClick={requestOngoing(choice.index)}
        >
          {choice.content}
        </Button>
      ))}
    </>
  );
}
