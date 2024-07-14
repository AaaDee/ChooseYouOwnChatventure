import { z } from 'zod';

export interface Choice {
  index: number;
  content: string;
}
export interface TextEntry {
  id: string;
  content: string;
  choices: Choice[];
}

export interface ChatHistory {
  entries: TextEntry[];
  choices: number[];
}

export const UserInput = z.object({
  username: z.string(),
  password: z.string()
});

export type UserInput = z.infer<typeof UserInput>;
