import { OpenAIRoles } from './types';
import { requestCompletions } from './requestCompletions';

export const requestDummyResponse = async (): Promise<string | null> => {
  const messages = [{ role: OpenAIRoles.USER, content: 'Say this is a test' }];
  return await requestCompletions(messages);
};
