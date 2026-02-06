import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectEntryOrUserLoading } from '../../features/entry/selectors';
import {
  selectImage,
  selectIsRequestingImage
} from '../../features/image/selectors';
import { useLoadImage } from '../../hooks/useLoadImage';
import { Spinner } from '../Spinner/Spinner';
import { StyledImage, StyledWrapper } from './style';

export function Illustration() {
  useLoadImage();
  const image = useSelector(selectImage);
  const imageSrc = formatImageSource(image);
  const entryOrUserIsLoading = useSelector(selectEntryOrUserLoading);
  const isRequestingImage = useSelector(selectIsRequestingImage);

  const [imageIsLoading, setImageIsLoading] = useState(false);

  useEffect(() => {
    if (isRequestingImage) {
      setImageIsLoading(true);
    }
  }, [isRequestingImage]);

  return (
    <StyledWrapper>
      {entryOrUserIsLoading && <Spinner text={'Venturing'} />}
      {imageIsLoading && <Spinner text={'Observing the surroundings'} />}
      <StyledImage src={imageSrc} onLoad={() => setImageIsLoading(false)} />
    </StyledWrapper>
  );
}

function formatImageSource(image: string): string {
  if (image.startsWith('http')) {
    return image;
  }

  return `data::image/jpg;base64, ${image}`;
}
