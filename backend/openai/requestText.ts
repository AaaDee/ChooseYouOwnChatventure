import OpenAI from 'openai';

export const requestText = async (_prompt: string): Promise<string | null> => {
  const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY']
  });

  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: 'Say this is a test' }],
      model: 'gpt-3.5-turbo'
    });
    return chatCompletion.choices[0].message.content;
  } catch (error) {
    console.log(error);
    return 'error!';
  }
};
