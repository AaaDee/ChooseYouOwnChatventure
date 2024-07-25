import React from 'react';
import { useStartRequest } from '../../hooks/useStartRequest';
import { Button } from '../Button/Button';
import { Wrapper } from './style';

export function StartView() {
  const onClick = useStartRequest();
  return (
    <Wrapper>
      <Button
        onClick={onClick}
        data-testid="start_button"
        content={'Start your journey'}
      />
    </Wrapper>
  );
}
