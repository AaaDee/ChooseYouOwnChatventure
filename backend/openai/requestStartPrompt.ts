import { parseCompletionResponse } from './parseCompletionResponse';
import { PROMPT_INITIAL_CHOICES } from './prompts';
import { requestCompletions } from './requestCompletions';
import { OpenAIRoles } from './types';

export async function requestStartPrompt() {
  const messages = [
    { role: OpenAIRoles.USER, content: PROMPT_INITIAL_CHOICES }
  ];
  const response = await requestCompletions(messages);
  return parseCompletionResponse(response);
}
