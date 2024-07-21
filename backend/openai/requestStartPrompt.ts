import { PROMPT_INITIAL_CHOICES } from './prompts';
import { requestCompletions } from './requestCompletions';
import { requestImage } from './requestImage.ts';
import { OpenAIRoles } from './types';

export async function requestStartPrompt() {
  const messages = [
    { role: OpenAIRoles.USER, content: PROMPT_INITIAL_CHOICES }
  ];
  const completion = await requestCompletions(messages);
  const image = await requestImage(completion.description);
  return {
    entry: completion,
    image
  };
}
