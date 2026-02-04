import { ChatCompletion, ChatCompletionMessageParam } from 'openai/resources';
import { getOpenAIClient } from './getOpenAIClient';
import { parseCompletionResponse } from './parseCompletionResponse';
import { TextEntry } from '../types';
import { OpenAIRoles } from './types';
import { PROMPT_ERROR_FIX } from './prompts';
import OpenAI from 'openai';

export const requestCompletions = async (
  messages: Array<ChatCompletionMessageParam>
): Promise<TextEntry> => {
  const openai = getOpenAIClient();

  const completions = await getCompletions(openai, messages);
  const completionsContent = getCompletionsContent(completions);

  try {
    const response = parseCompletionResponse(completionsContent);
    return response;
  } catch (error) {
    console.error(error, completionsContent);
    console.log('reattempting');

    messages.push(completions.choices[0].message);
    messages.push({
      role: OpenAIRoles.USER,
      content: PROMPT_ERROR_FIX
    });

    const retryCompletions = await getCompletions(openai, messages);
    const retryCompletionsContent = getCompletionsContent(retryCompletions);

    try {
      const response = parseCompletionResponse(retryCompletionsContent);
      return response;
    } catch (error) {
      console.error('retry error:', error, completionsContent);
    }
  }
  throw new Error('unable to return a text completion');
};

async function getCompletions(
  openai: OpenAI,
  messages: Array<ChatCompletionMessageParam>
) {
  const completions = await openai.chat.completions.create({
    messages,
    model: 'gpt-4o-mini'
  });
  return completions;
}

function getCompletionsContent(completions: ChatCompletion) {
  return completions.choices[0].message.content as string;
}
