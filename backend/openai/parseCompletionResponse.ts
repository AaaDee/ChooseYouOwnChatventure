import { Choice, TextEntry } from '../types';
import { isArray } from '../validators/isArray';
import { isString } from '../validators/isString';
import { v4 as uuidv4 } from 'uuid';

export function parseCompletionResponse(response: string | null): TextEntry {
  if (response === null) {
    throw new Error('null response');
  }
  console.log('response:', response);

  let stringResponse = response;

  if (startsWithBackTicks(stringResponse)) {
    console.log('removing backticks from prompt response');
    stringResponse = removeBackTicks(stringResponse);
  }

  let jsonResponse;
  try {
    jsonResponse = JSON.parse(stringResponse) as object;
    console.log(jsonResponse);
  } catch (error) {
    console.log(error);
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

// Check for a typical OpenAI response error
function startsWithBackTicks(response: string): boolean {
  return response.startsWith('```json');
}

function removeBackTicks(response: string): string {
  let result = response.replace('```json', '');
  result = result.replace('```', '');
  return result;
}
