import { Button } from '../Button/Button';
import { useConsent } from '../../hooks/useConsent';
import { Actions, Text, Wrapper } from './style';

export function ConsentBanner() {
  const { status, accept, decline } = useConsent();

  if (status !== 'undecided') {
    return null;
  }

  return (
    <Wrapper role="dialog" aria-label="Cookie consent">
      <Text>
        We use cookies for analytics to understand how the adventure is played.
        These are only set if you accept.
      </Text>
      <Actions>
        <Button onClick={accept}>Accept</Button>
        <Button onClick={decline}>Decline</Button>
      </Actions>
    </Wrapper>
  );
}
