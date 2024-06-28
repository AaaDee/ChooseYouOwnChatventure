import styled, { keyframes } from 'styled-components';

const keyFrames = keyframes`
  to {
    clip-path: inset(0 -1ch 0 0)
  }
`;

export const SpinnerBackground = styled.div`
  position: absolute;
  display: flex;
  width: 40vw;
  height: 40vh;
  background-color: rgba(100, 100, 100, 0.5);
  align-self: center;
  margin-top: 100px;
  align-items: center;
  justify-content: center;
`;

export const StyledSpinner = styled.div`
  font-weight: bold;
  clip-path: inset(0 12px 0 0);
  animation: ${keyFrames} 1s steps(5) infinite;
`;
