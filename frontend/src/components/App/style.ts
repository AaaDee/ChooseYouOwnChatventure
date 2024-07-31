import styled from 'styled-components';
import { globalStyles } from '../../style/globalStyles';

export const StyledBody = styled.div`
  display: flex;
  flex-flow: column;
  min-height: 100vh;
  padding: 100px;
  gap: 1em;

  box-sizing: border-box;
  width: 100%;
  max-width: 2000px;
`;

export const StyledApp = styled.div`
  display: flex;
  flex-flow: column;
  background-color: ${globalStyles.colors.background};
  align-items: center;
  min-width: 640px;
`;
