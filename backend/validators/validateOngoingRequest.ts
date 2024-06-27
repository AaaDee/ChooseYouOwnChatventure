import { ChatHistory } from '../types';
import { isArray } from './isArray';
import { isNumber } from './isNumber';
import { isTextEntry } from './isTextEntry';

export function validateOngoingRequest(data: object): data is ChatHistory {
  if (!('entries' in data)) {
    throw new Error('entries missing from request');
  }
  if (!('choices' in data)) {
    throw new Error('choices missing from request');
  }

  if (!isArray(data.choices)) {
    throw new Error('choices is not an array');
  }

  if (!isArray(data.entries)) {
    throw new Error('entries is not an array');
  }

  if (data.choices.some((choice) => !isNumber(choice))) {
    throw new Error('choices are not numbers');
  }

  if (data.entries.some((entry) => !isTextEntry(entry))) {
    throw new Error('entries are not correctly formatted');
  }
  return true;
}
