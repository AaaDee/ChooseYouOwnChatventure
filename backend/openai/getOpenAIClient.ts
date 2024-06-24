import OpenAI from 'openai';

export function getOpenAIClient() {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
  return openai;
}

export function getOpenAiCompletions() {
  const openai = getOpenAIClient();
  return openai.chat.completions;
}
