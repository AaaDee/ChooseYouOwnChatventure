import { PromptResponse } from '../types';
import { PROMPT_INITIAL_CHOICES } from './prompts';
import { requestCompletions } from './requestCompletions';
import { OpenAIRoles } from './types';

export async function requestStartPrompt(): Promise<PromptResponse> {
  const startPromptMessages = [
    { role: OpenAIRoles.USER, content: PROMPT_INITIAL_CHOICES }
  ];

  let completion = null;
  try {
    completion = await requestCompletions(startPromptMessages);
  } catch {
    throw new Error('unable to create a completion');
  }

  return {
    entry: completion
  };
}
