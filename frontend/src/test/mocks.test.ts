import { mockChoices } from './mocks';
import { expectTypeOf, test } from 'vitest';

test('Mock choices is an array', () => {
  expectTypeOf(mockChoices).toBeArray();
});
