import { TextEntry } from '../types';

export function parseCompletionResponse(response: string | null): TextEntry {
  if (response === null) {
    throw new Error('null response');
  }

  let jsonResponse;
  try {
    jsonResponse = JSON.parse(response) as unknown;
  } catch {
    throw new Error('Invalid response');
  }

  if (!jsonResponse || typeof jsonResponse !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('content' in jsonResponse && 'choices' in jsonResponse) {
    const entry: TextEntry = {
      id: 'id',
      content: parseContent(jsonResponse.content),
      choices: parseChoices(jsonResponse.choices)
    };
    return entry;
  }
  throw new Error('Invalid data');
}

function parseContent(content: unknown): string {
  if (typeof content === 'string' || content instanceof String) {
    return content as string;
  }
  throw new Error('invalid content field');
}

function parseChoices(choices: unknown): string[] {
  if (!Array.isArray(choices)) {
    throw new Error('choices are not an array');
  }
  if (choices.some((choice) => typeof choice !== 'string')) {
    throw new Error('all choices are not strings');
  }
  return choices as string[];
}
