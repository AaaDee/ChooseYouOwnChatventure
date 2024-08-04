import { OpenAIRoles } from './types';
import { requestCompletions } from './requestCompletions';

export const requestDummyPrompt = async (): Promise<string | null> => {
  const messages = [{ role: OpenAIRoles.USER, content: 'Say this is a test' }];
  const response = await requestCompletions(messages);
  return response.content;
};
