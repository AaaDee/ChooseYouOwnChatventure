import OpenAI from 'openai';
import { getOpenAIClient } from './getOpenAIClient';
import { promptImage } from './prompts';

export const requestImage = async (description: string): Promise<string> => {
  const openai = getOpenAIClient();
  let imageResponse = null;
  try {
    imageResponse = await getImageResponse(openai, description);
  } catch (error) {
    throw new Error('unable to get image');
  }

  return imageResponse;
};

async function getImageResponse(
  openai: OpenAI,
  description: string
): Promise<string> {
  const prompt = promptImage(description);

  const imageResponse = await openai.images.generate({
    prompt,
    n: 1,
    response_format: 'b64_json',
    quality: 'standard',
    model: 'dall-e-3',
    size: '1024x1024'
  });

  return imageResponse.data[0].b64_json as string;
}
