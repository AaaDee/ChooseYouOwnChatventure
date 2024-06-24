import OpenAI from 'openai';
import { requestText } from './requestText';
import { OpenAIRoles } from './types';

export const requestDummyResponse = async (
  completions: OpenAI.Chat.Completions
): Promise<string | null> => {
  const messages = [{ role: OpenAIRoles.USER, content: 'Say this is a test' }];
  return await requestText(messages, completions);
};
