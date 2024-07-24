import { PROMPT_INITIAL_CHOICES } from './prompts';
import { requestCompletions } from './requestCompletions';
import { requestImage } from './requestImage.ts';
import { OpenAIRoles } from './types';

export async function requestStartPrompt() {
  const startPromptMessages = [
    { role: OpenAIRoles.USER, content: PROMPT_INITIAL_CHOICES }
  ];

  let completion = null;
  try {
    completion = await requestCompletions(startPromptMessages);
  } catch {
    throw new Error('unable to create completion');
  }

  let image = null;
  try {
    image = await requestImage(completion.description);
  } catch {
    throw new Error('unable to create image');
  }

  return {
    entry: completion,
    image
  };
}
