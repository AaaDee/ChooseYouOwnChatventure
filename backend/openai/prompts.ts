const PROMPT_FORMAT = `
Structure the response into JSON as follows:

{
	content,
	choices,
  description
}

where content contains the text excerpt, excluding the player's choices. Choices is an array of exactly three choices that the player can make. Description contains a description of the scene for image generation purposes
`;

export const PROMPT_INITIAL_CHOICES = `Create an excerpt of a sword and sorcery gamebook, where the reader is the protagonist and may choose the outcome of the story.

${PROMPT_FORMAT}
`;

export function promptFurtherChoices(choice: number): string {
  return `The player has chosen ${choice}. Continue with the story.

  ${PROMPT_FORMAT}
  `;
}

export const PROMPT_ERROR_FIX = `
The previous message is not in correct format.

${PROMPT_FORMAT}
`;

export function promptImage(scene: string): string {
  return `an illustration from a 70s/80s sword and sorcery novel, with a hand-drawn look and pulp style, depicting the following scene:

  ${scene}
  `;
}
