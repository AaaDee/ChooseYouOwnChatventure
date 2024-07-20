import { Choice, TextEntry } from '../types';
import { isArray } from '../validators/isArray';
import { isString } from '../validators/isString';
import { v4 as uuidv4 } from 'uuid';

export function parseCompletionResponse(response: string | null): TextEntry {
  if (response === null) {
    throw new Error('null response');
  }
  console.log('response:', response);

  let jsonResponse;
  try {
    jsonResponse = JSON.parse(response) as object;
  } catch {
    throw new Error('Response is not a valid json');
  }

  if (
    'content' in jsonResponse &&
    'choices' in jsonResponse &&
    'description' in jsonResponse
  ) {
    const entry: TextEntry = {
      id: uuidv4(),
      content: parseContent(jsonResponse.content),
      choices: parseChoices(jsonResponse.choices),
      description: parseDescription(jsonResponse.description)
    };
    return entry;
  }
  throw new Error('Invalid data');
}

function parseContent(content: unknown): string {
  if (isString(content)) {
    return content;
  }
  throw new Error('invalid content field');
}

function parseDescription(content: unknown): string {
  if (isString(content)) {
    return content;
  }
  throw new Error('invalid description field');
}

function parseChoices(choices: unknown): Choice[] {
  if (!isArray(choices)) {
    throw new Error('choices are not an array');
  }
  if (choices.some((choice: unknown) => !isString(choice))) {
    throw new Error('all choices are not strings');
  }

  const result: Choice[] = (choices as string[]).map(
    (choice: string, index) => {
      return {
        content: choice,
        index: index + 1 // from 0 to 1-based indexing
      };
    }
  );
  return result;
}
