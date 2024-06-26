import React from 'react';
import { useStartRequest } from '../../hooks/useStartRequest';

export function StartView() {
  const onClick = useStartRequest();
  return (
    <button onClick={onClick} data-testid="start_button">
      Start your journey
    </button>
  );
}
