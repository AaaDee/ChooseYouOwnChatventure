import { ChatCompletionMessageParam } from 'openai/resources';
import { getOpenAIClient } from './getOpenAIClient';
import { parseCompletionResponse } from './parseCompletionResponse';
import { TextEntry } from '../types';
import { OpenAIRoles } from './types';
import { PROMPT_ERROR_FIX } from './prompts';

export const requestCompletions = async (
  messages: Array<ChatCompletionMessageParam>
): Promise<TextEntry | null> => {
  const openai = getOpenAIClient();

  const completions = await openai.chat.completions.create({
    messages,
    model: 'gpt-4o-mini'
  });

  try {
    const response = parseCompletionResponse(
      completions.choices[0].message.content
    );
    return response;
  } catch (error) {
    console.log(error, completions.choices[0].message.content);
    console.log('reattempting');

    messages.push(completions.choices[0].message);
    messages.push({
      role: OpenAIRoles.USER,
      content: PROMPT_ERROR_FIX
    });

    const retryCompletions = await openai.chat.completions.create({
      messages,
      model: 'gpt-4o-mini'
    });

    try {
      const response = parseCompletionResponse(
        retryCompletions.choices[0].message.content
      );
      return response;
    } catch (error) {
      console.log('retry error');
      console.log(error, completions.choices[0].message.content);
    }
  }
  return null;
};
