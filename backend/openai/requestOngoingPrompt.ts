import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { ChatHistory } from '../types';
import { OpenAIRoles } from './types';
import { PROMPT_INITIAL_CHOICES, promptFurtherChoices } from './prompts';
import { requestCompletions } from './requestCompletions';
import { requestImage } from './requestImage.ts';

export async function requestOngoingPrompt(history: ChatHistory) {
  const { choices, entries } = history;

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
  const completion = await requestCompletions(messageHistory);
  console.log(completion);
  const image = await requestImage(completion.description);
  return {
    entry: completion,
    image
  };
}
