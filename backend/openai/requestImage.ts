import OpenAI from 'openai';
import { getOpenAIClient } from './getOpenAIClient';
import { promptImage } from './prompts';

export const requestImage = async (description: string): Promise<string> => {
  const openai = getOpenAIClient();
  let imageResponse;
  try {
    imageResponse = await getImageResponse(openai, description);
  } catch (error) {
    throw new Error('error in requesting image', { cause: error });
  }

  if (!imageResponse) {
    throw new Error('poorly formatted image response');
  }

  return imageResponse;
};

async function getImageResponse(
  openai: OpenAI,
  description: string
): Promise<string | undefined> {
  const prompt = promptImage(description);

  const imageResponse = await openai.images.generate({
    prompt,
    n: 1,
    response_format: 'url',
    quality: 'standard',
    model: 'dall-e-3',
    size: '1024x1024'
  });

  if (!imageResponse.data) {
    return undefined;
  }

  return imageResponse.data[0].url;
}
