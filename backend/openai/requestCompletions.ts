import { ChatCompletionMessageParam } from 'openai/resources';
import { getOpenAIClient } from './getOpenAIClient';
import { parseCompletionResponse } from './parseCompletionResponse';
import { TextEntry } from '../types';

export const requestCompletions = async (
  messages: Array<ChatCompletionMessageParam>
): Promise<TextEntry | null> => {
  const openai = getOpenAIClient();

  const completions = await openai.chat.completions.create({
    messages,
    model: 'gpt-3.5-turbo'
  });
  try {
    const response = parseCompletionResponse(
      completions.choices[0].message.content
    );
    return response;
  } catch (error) {
    console.log(error, completions.choices[0].message.content);
  }
  return null;
};
