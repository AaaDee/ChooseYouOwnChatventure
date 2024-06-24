import { promptFurtherChoices } from './prompts';

describe('Choice number is passed to prompt', () => {
  test('one is passed', () => {
    const prompt = promptFurtherChoices(1);
    expect(prompt).toContain('1');
  });
});
