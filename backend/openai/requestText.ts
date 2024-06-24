import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';
import { OpenAIRoles } from './types';
import { PROMPT_INITIAL_CHOICES, promptFurtherChoices } from './prompts';

export const requestText = async (
  messages: Array<ChatCompletionMessageParam>,
  completions: OpenAI.Chat.Completions
): Promise<string | null> => {
  try {
    const chatCompletion = await completions.create({
      messages,
      model: 'gpt-3.5-turbo'
    });
    return chatCompletion.choices[0].message.content;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export async function requestInitialChoices(
  completions: OpenAI.Chat.Completions
) {
  const messages = [
    {
      role: OpenAIRoles.USER,
      content: PROMPT_INITIAL_CHOICES
    }
  ];

  return await requestText(messages, completions);
}

export async function requestFurtherChoices(
  completions: OpenAI.Chat.Completions,
  old_messages: Array<ChatCompletionMessageParam>,
  choice_index: number
) {
  const new_message: ChatCompletionMessageParam = {
    role: OpenAIRoles.USER,
    content: promptFurtherChoices(choice_index)
  };

  const messages: Array<ChatCompletionMessageParam> = [
    ...old_messages,
    new_message
  ];

  return await requestText(messages, completions);
}
