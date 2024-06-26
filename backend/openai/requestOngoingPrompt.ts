/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { TextEntry } from '../types';
import { OpenAIRoles } from './types';
import { PROMPT_INITIAL_CHOICES, promptFurtherChoices } from './prompts';
import { requestCompletions } from './requestCompletions';
import { parseCompletionResponse } from './parseCompletionResponse';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function requestOngoingPrompt(history: any) {
  const choices: number[] = history.choices;
  const entries: TextEntry[] = history.entries;

  const messageHistory: ChatCompletionMessageParam[] = [
    { role: OpenAIRoles.USER, content: PROMPT_INITIAL_CHOICES }
  ];

  entries.forEach((entry, index) => {
    let message_content = entry.content;
    entry.choices.forEach((choice) => {
      message_content += choice.content;
    });

    const contentMessage = {
      role: OpenAIRoles.SYSTEM,
      content: message_content
    };
    messageHistory.push(contentMessage);

    const choice = choices[index];
    const choiceMessage = {
      role: OpenAIRoles.USER,
      content: promptFurtherChoices(choice)
    };
    messageHistory.push(choiceMessage);
  });

  console.log(messageHistory);
  const response = await requestCompletions(messageHistory);
  console.log(response);
  return parseCompletionResponse(response);
}
