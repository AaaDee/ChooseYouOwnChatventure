import { StyledMusicButton, StyledMusicNote, SuperImposedNo } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { selectAudioMuted } from '../../features/settings/selectors';
import { setAudioMuted } from '../../features/settings/slice';

export function MusicButton() {
  const isMuted = useSelector(selectAudioMuted);
  const dispatch = useDispatch();

  function flipMuted() {
    dispatch(setAudioMuted(!isMuted));
  }

  return (
    <StyledMusicButton onClick={flipMuted}>
      <StyledMusicNote>♫</StyledMusicNote>
      {isMuted && <SuperImposedNo> ⃠</SuperImposedNo>}
    </StyledMusicButton>
  );
}
