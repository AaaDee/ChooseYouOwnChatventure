import OpenAI from 'openai';

export const requestText = async (
  _prompt: string,
  completions: OpenAI.Chat.Completions
): Promise<string | null> => {
  try {
    const chatCompletion = await completions.create({
      messages: [{ role: 'user', content: 'Say this is a test' }],
      model: 'gpt-3.5-turbo'
    });
    return chatCompletion.choices[0].message.content;
  } catch (error) {
    console.log(error);
    return null;
  }
};
