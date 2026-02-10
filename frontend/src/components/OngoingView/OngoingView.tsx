import { useSelector } from 'react-redux';
import {
  selectChoices,
  selectContent,
  selectEntryOrUserLoading
} from '../../features/entry/selectors';
import { useOngoingRequest } from '../../hooks/useOngoingRequest';
import { Button } from '../Button/Button';

export function OngoingView() {
  const choices = useSelector(selectChoices);
  const content = useSelector(selectContent);
  const requestOngoing = useOngoingRequest();
  const entryOrUserIsLoading = useSelector(selectEntryOrUserLoading);

  if (!choices) {
    return null;
  }

  return (
    <>
      <div data-testid="ongoing_text">{content}</div>
      {choices.map((choice) => (
        <Button
          key={choice.index}
          disabled={entryOrUserIsLoading}
          onClick={requestOngoing(choice.index)}
        >
          {choice.content}
        </Button>
      ))}
    </>
  );
}
