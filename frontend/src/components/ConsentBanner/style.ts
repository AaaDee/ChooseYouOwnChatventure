import styled from 'styled-components';
import { globalStyles, TextStyle } from '../../style/globalStyles';

export const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  gap: 1em;

  padding: 1em;
  box-sizing: border-box;
  background-color: ${globalStyles.colors.textbox};
  box-shadow: 0 -4px ${globalStyles.colors.shadow};
`;

export const Text = styled.p`
  ${TextStyle}
  margin: 0;
  max-width: 60ch;
`;

export const Actions = styled.div`
  display: flex;
  flex-flow: row;
  gap: 0.5em;
`;
