import { parseCompletionResponse } from './parseCompletionResponse';

const mockResponse = `{"content": "test", "choices": ["one", "two", "three"], "description": "testing"}`;

describe('completions parser', () => {
  test('parses content as text', () => {
    const entry = parseCompletionResponse(mockResponse);
    expect(entry.content).toEqual('test');
  });

  test('parses a correct amount of choices', () => {
    const entry = parseCompletionResponse(mockResponse);
    expect(entry.choices.length).toEqual(3);
  });

  test('parses a choice properly', () => {
    const entry = parseCompletionResponse(mockResponse);
    expect(entry.choices[0].content).toEqual('one');
  });
});
