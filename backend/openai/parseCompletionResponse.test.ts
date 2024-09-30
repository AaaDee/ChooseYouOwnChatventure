import { describe, expect, test } from 'vitest';
import { parseCompletionResponse } from './parseCompletionResponse';
import { mockJsonStringResponse } from '../tests/mocks';

describe('completions parser', () => {
  test('parses content as text', () => {
    const entry = parseCompletionResponse(mockJsonStringResponse);
    expect(entry.content).toEqual('test');
  });

  test('parses a correct amount of choices', () => {
    const entry = parseCompletionResponse(mockJsonStringResponse);
    expect(entry.choices.length).toEqual(3);
  });

  test('parses a choice properly', () => {
    const entry = parseCompletionResponse(mockJsonStringResponse);
    expect(entry.choices[0].content).toEqual('one');
  });

  test('catches backticks from open ai', () => {
    const badResponse = '```json' + mockJsonStringResponse + '```';
    const entry = parseCompletionResponse(badResponse);
    expect(entry.content).toEqual('test');
  });
});
