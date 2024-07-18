export const PROMPT_INITIAL_CHOICES = `Create an excerpt of a Fighting Fantasy novel.

Structure the response into JSON as follows:

{
	content,
	choices
}

where content contains the text excerpt, excluding the player's choices. Choices is an array of exactly three choices that the player can make.
`;

export function promptFurtherChoices(choice: number): string {
  return `The player has chosen ${choice}. Continue with the story.

Structure the response into JSON as follows:

{
	content,
	choices
}

where content contains the text excerpt, excluding the player's choices. Choices is an array of exactly three choices that the player can make.
  
  `;
}

export const PROMPT_ERROR_FIX = `
The previous message is not in correct format.
Structure the response into JSON as follows:

{
	content,
	choices
}

where content contains the text excerpt, excluding the player's choices. Choices is an array of exactly three choices that the player can make.
`;
