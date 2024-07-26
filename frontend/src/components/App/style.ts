import styled from 'styled-components';
import { globalStyles } from '../../style/globalStyles';

export const StyledBody = styled.div`
  display: flex;
  flex-flow: column;
  min-height: 100vh;
  padding: 100px;
  gap: 1em;
`;

export const StyledApp = styled.div`
  display: flex;
  flex-flow: column;
  background-color: ${globalStyles.colors.background};
`;
