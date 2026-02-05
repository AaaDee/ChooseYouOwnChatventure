import { useSelector } from 'react-redux';
import { selectEntryOrUserLoading } from '../../features/entry/selectors';
import {
  selectImage,
  selectImageIsLoading
} from '../../features/image/selectors';
import { useLoadImage } from '../../hooks/useLoadImage';
import { Spinner } from '../Spinner/Spinner';
import { StyledImage, StyledWrapper } from './style';

export function Illustration() {
  useLoadImage();
  const image = useSelector(selectImage);
  const imageSrc = formatImageSource(image);
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

function formatImageSource(image: string): string {
  if (image.startsWith('http')) {
    return image;
  }

  return `data::image/jpg;base64, ${image}`;
}
