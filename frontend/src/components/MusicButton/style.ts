import styled from 'styled-components';
import { ButtonStyle } from '../Button/style';

export const StyledMusicButton = styled.button`
  position: relative;
  ${ButtonStyle}

  min-width: 34px;

  &:hover {
    > div {
      color: #ededca;
    }
  }
`;

export const StyledMusicNote = styled.div`
  font-size: x-large;
`;

export const SuperImposedNo = styled.div`
  font-size: x-large;
  position: absolute;
  top: 1px;
  left: 21px;
  z-index: 1;
`;
