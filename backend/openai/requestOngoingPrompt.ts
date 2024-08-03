import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { ChatHistory, PromptResponse } from '../types';
import { OpenAIRoles } from './types';
import { PROMPT_INITIAL_CHOICES, promptFurtherChoices } from './prompts';
import { requestCompletions } from './requestCompletions';

export async function requestOngoingPrompt(
  history: ChatHistory
): Promise<PromptResponse> {
  const { choices, entries } = history;

  let messageHistory: ChatCompletionMessageParam[] = [
    { role: OpenAIRoles.USER, content: PROMPT_INITIAL_CHOICES }
  ];

  console.log('entries length', entries.length);
  entries.forEach((entry, index) => {
    let message_content = entry.content;
    entry.choices.forEach((choice) => {
      message_content += choice.content;
    });

    const contentMessage = {
      role: OpenAIRoles.SYSTEM,
      content: message_content
    };
    messageHistory = [...messageHistory, contentMessage];

    const choice = choices[index];
    const choiceMessage = {
      role: OpenAIRoles.USER,
      content: promptFurtherChoices(choice)
    };
    messageHistory = [...messageHistory, choiceMessage];
  });

  console.log(messageHistory);
  console.log('mh len', messageHistory.length);

  let completion = null;
  try {
    completion = await requestCompletions([...messageHistory]);
  } catch {
    throw new Error('unable to create completion');
  }

  // let image = null;
  // try {
  //   image = await requestImage(completion.description);
  // } catch {
  //   throw new Error('unable to create image');
  // }

  return {
    entry: completion
  };
}
