import styled from 'styled-components';
import { globalStyles } from '../../style/globalStyles';

export const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  border: solid;
  height: fit-content;
  border-color: black;
  box-shadow: 10px 5px 5px ${globalStyles.colors.shadow};
`;

export const TitleText = styled.h1`
  font-style: italic;
`;
