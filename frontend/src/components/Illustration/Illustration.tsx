import { useSelector } from 'react-redux';
import { StyledImage, StyledWrapper } from './style';
import {
  selectImage,
  selectStatusIsLoading
} from '../../features/entry/selectors';
import { Spinner } from '../Spinner/Spinner';

export function Illustration() {
  const imageData = useSelector(selectImage);
  const imageSrc = `data::image/jpg;base64, ${imageData}`;
  const isLoading = useSelector(selectStatusIsLoading);

  return (
    <StyledWrapper>
      {isLoading && <Spinner />}
      <StyledImage src={imageSrc} />
    </StyledWrapper>
  );
}
