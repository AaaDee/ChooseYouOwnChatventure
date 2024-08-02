import React from 'react';
import { SpinnerBackground, StyledSpinner } from './style';

interface Props {
  text: string;
}

export function Spinner({ text }: Props) {
  return (
    <SpinnerBackground>
      <StyledSpinner>{text}...</StyledSpinner>
    </SpinnerBackground>
  );
}
