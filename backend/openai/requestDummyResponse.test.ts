// Allow 'any' type for mocks
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, test } from '@jest/globals';
import { requestDummyResponse } from './requestDummyResponse';
import { mockChoices } from '../tests/mocks';

describe('Open api text completions', () => {
  test('create is called', async () => {
    const { mockCompletions, mockCreate } = constructMockCreate();
    await requestDummyResponse(mockCompletions);
    expect(mockCreate).toBeCalled();
  });

  test('parses the content', async () => {
    const { mockCompletions } = constructMockCreate();
    const response = await requestDummyResponse(mockCompletions);
    expect(response).toEqual('this is a mock');
  });
});

function constructMockCreate() {
  const mockCreate = jest.fn();
  mockCreate.mockReturnValue(mockChoices);

  const mockCompletions = {
    create: mockCreate
  } as any;

  return { mockCompletions, mockCreate };
}
