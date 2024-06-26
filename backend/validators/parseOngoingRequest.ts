import { ChatHistory } from '../types';

export function parseOngoingRequest(data: object): ChatHistory {
  if (!('entries' in data)) {
    throw new Error('entries missing from request');
  }
  if (!('choices' in data)) {
    throw new Error('choices missing from request');
  }

  // todo continue
  return data as ChatHistory;
}
