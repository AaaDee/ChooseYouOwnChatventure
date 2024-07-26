import styled from 'styled-components';
import { globalStyles } from '../../style/globalStyles';

export const StyledTextBox = styled.div`
  display: flex;
  flex-flow: column;
  background-color: ${globalStyles.colors.textbox};
  border: solid 1px;
  border-color: black;
  margin: 20px;
  padding: 10px;
  min-height: 100px;
  gap: 10px;
`;
