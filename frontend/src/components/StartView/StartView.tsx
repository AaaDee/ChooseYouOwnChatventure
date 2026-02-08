import { useStartRequest } from '../../hooks/useStartRequest';
import { Button } from '../Button/Button';
import { Wrapper } from './style';

export function StartView() {
  const onClick = useStartRequest();

  console.log('rendering!');
  return (
    <Wrapper>
      <Button onClick={onClick} data-testid="start_button">
        Start your journey
      </Button>
    </Wrapper>
  );
}
