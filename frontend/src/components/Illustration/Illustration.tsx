import { useSelector } from 'react-redux';
import { StyledImage, StyledWrapper } from './style';
import { selectEntryOrUserLoading } from '../../features/entry/selectors';
import { Spinner } from '../Spinner/Spinner';
import {
  selectImage,
  selectImageIsLoading
} from '../../features/image/selectors';
import { useLoadImage } from '../../hooks/useLoadImage';

export function Illustration() {
  useLoadImage();
  const imageData = useSelector(selectImage);
  const imageSrc = `data::image/jpg;base64, ${imageData}`;
  const entryOrUserIsLoading = useSelector(selectEntryOrUserLoading);
  const imageIsLoading = useSelector(selectImageIsLoading);

  return (
    <StyledWrapper>
      {entryOrUserIsLoading && <Spinner text={'Venturing'} />}
      {imageIsLoading && <Spinner text={'Observing the surroundings'} />}
      <StyledImage src={imageSrc} />
    </StyledWrapper>
  );
}
