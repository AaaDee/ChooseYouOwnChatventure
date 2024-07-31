import styled from 'styled-components';
import { ButtonStyle } from '../Button/style';
import { globalStyles } from '../../style/globalStyles';

export const StyledMusicButton = styled.button`
  position: relative;
  ${ButtonStyle}

  width: 34px;
  height: 34px;

  &:hover {
    > div {
      color: ${globalStyles.colors.button};
    }
    > svg {
      stroke: ${globalStyles.colors.button};
    }
  }
`;

export const StyledMusicNote = styled.div`
  font-size: x-large;
`;

export const StyledSvg = styled.svg`
  position: absolute;
  scale: 80%;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  stroke: black;
  stroke-width: 0.5;
  fill: none;
  overflow: visible;
`;
