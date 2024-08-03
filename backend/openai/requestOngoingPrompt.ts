import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { ChatHistory, PromptResponse } from '../types';
import { OpenAIRoles } from './types';
import { PROMPT_INITIAL_CHOICES, promptFurtherChoices } from './prompts';
import { requestCompletions } from './requestCompletions';

export async function requestOngoingPrompt(
  history: ChatHistory
): Promise<PromptResponse> {
  const { choices, entries } = history;

  const messageHistory: ChatCompletionMessageParam[] = [
    { role: OpenAIRoles.USER, content: PROMPT_INITIAL_CHOICES }
  ];

  entries.forEach((entry, index) => {
    let message_content = entry.content;
    entry.choices.forEach((choice, index) => {
      const choiceLine = ` \n${index + 1}: ${choice.content}`;
      message_content += choiceLine;
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

  let completion = null;
  console.log(messageHistory);
  try {
    completion = await requestCompletions(messageHistory);
  } catch {
    throw new Error('unable to create completion');
  }

  return {
    entry: completion
  };
}
