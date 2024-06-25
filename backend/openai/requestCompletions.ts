import { ChatCompletionMessageParam } from 'openai/resources';
import { getOpenAIClient } from './getOpenAIClient';

export const requestCompletions = async (
  messages: Array<ChatCompletionMessageParam>
): Promise<string | null> => {
  const openai = getOpenAIClient();

  try {
    const completions = await openai.chat.completions.create({
      messages,
      model: 'gpt-3.5-turbo'
    });
    return completions.choices[0].message.content;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
