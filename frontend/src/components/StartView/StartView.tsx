import { useSelector } from 'react-redux';
import { selectEntryOrUserLoading } from '../../features/entry/selectors';
import { useStartRequest } from '../../hooks/useStartRequest';
import { Button } from '../Button/Button';
import { Wrapper } from './style';

export function StartView() {
  const onClick = useStartRequest();
  const entryOrUserIsLoading = useSelector(selectEntryOrUserLoading);

  return (
    <Wrapper>
      <Button
        onClick={onClick}
        disabled={entryOrUserIsLoading}
        data-testid="start_button"
      >
        Start your journey
      </Button>
    </Wrapper>
  );
}
