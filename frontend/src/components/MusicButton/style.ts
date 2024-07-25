import styled from 'styled-components';
import { ButtonStyle } from '../Button/style';

export const StyledMusicButton = styled.button`
  position: relative;
  ${ButtonStyle}

  &:hover {
    > div {
      color: #ededca;
    }
  }
`;

export const StyledMusicNote = styled.div``;

export const SuperImposedNo = styled.div`
  position: absolute;
  top: 1px;
  left: 14px;
  z-index: 1;
`;
