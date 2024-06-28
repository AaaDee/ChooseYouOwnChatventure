import React from 'react';
import { SpinnerBackground, StyledSpinner } from './style';

export function Spinner() {
  return (
    <SpinnerBackground>
      <StyledSpinner>Venturing...</StyledSpinner>
    </SpinnerBackground>
  );
}
