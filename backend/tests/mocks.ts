import OpenAI from 'openai';
import {
  ChatHistory,
  ImageDescription,
  PromptResponse,
  TextEntry
} from '../types';
import { ChatCompletionMessageParam } from 'openai/resources';

export const mockOpenAiCompletionResponse: OpenAI.Chat.Completions.ChatCompletion =
  {
    id: 'chatcmpl-abc123',
    object: 'chat.completion',
    created: 1677858242,
    model: 'gpt-3.5-turbo-0613',
    usage: {
      prompt_tokens: 13,
      completion_tokens: 7,
      total_tokens: 20
    },
    choices: [
      {
        message: {
          role: 'assistant',
          content: '\n\nThis is a test!'
        },
        logprobs: null,
        finish_reason: 'stop',
        index: 0
      }
    ]
  };

export const mockEntry: TextEntry = {
  id: 'test',
  content: 'testing texting',
  choices: [
    { index: 1, content: 'do something' },
    { index: 2, content: 'do something else' }
  ],
  description: 'an image describing a test'
};

export const mockPrompt: PromptResponse = {
  entry: mockEntry
};

export const mockEmptyChatHistory: ChatHistory = {
  entries: [],
  choices: []
};

export const mockChatHistoryOneChoice: ChatHistory = {
  entries: [mockEntry],
  choices: [1]
};

export const mockImageDescription: ImageDescription = {
  description: 'test'
};

export const mockParsedHistory: ChatCompletionMessageParam[] = [];
