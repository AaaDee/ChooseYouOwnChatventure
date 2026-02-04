import { Choice, TextEntry } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

const UnformattedChoiceValidator = z.string().array();

interface UnverifiedJson {
  [key: string]: unknown;
}

export function parseCompletionResponse(response: string): TextEntry {
  console.log('response:', response);

  let stringResponse = response;

  if (startsWithBackTicks(stringResponse)) {
    console.log('removing backticks from prompt response');
    stringResponse = removeBackTicks(stringResponse);
  }

  let jsonResponse;
  try {
    jsonResponse = JSON.parse(stringResponse) as UnverifiedJson;
  } catch (error) {
    console.error(error);
    throw new Error('Response is not a valid json');
  }

  const updatedResponse = {
    ...jsonResponse,
    id: uuidv4(),
    choices: formatChoices(jsonResponse.choices)
  };

  const entry = TextEntry.parse(updatedResponse);
  return entry;
}

function formatChoices(choices: unknown): Choice[] {
  const validatedChoices = UnformattedChoiceValidator.parse(choices);

  const result: Choice[] = validatedChoices.map((choice: string, index) => {
    return {
      content: choice,
      index: index + 1 // from 0 to 1-based indexing
    };
  });
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
