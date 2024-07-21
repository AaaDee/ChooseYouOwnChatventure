import { useSelector } from 'react-redux';
import { StyledImage } from './style';
import { selectImage } from '../../features/entry/selectors';

export function Illustration() {
  const imageData = useSelector(selectImage);
  const imageSrc = `data::image/jpg;base64, ${imageData}`;

  return <StyledImage src={imageSrc} width={384} height={384} />;
}
