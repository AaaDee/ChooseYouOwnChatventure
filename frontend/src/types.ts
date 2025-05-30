import { z } from 'zod';

export const Choice = z.object({
  index: z.number(),
  content: z.string()
});

export type Choice = z.infer<typeof Choice>;

export const ImageDescription = z.object({
  description: z.string()
});

export type ImageDescription = z.infer<typeof ImageDescription>;

export const User = z.object({
  id: z.string(),
  username: z.string()
});

export type User = z.infer<typeof User>;

export const UserInput = z.object({
  username: z.string(),
  password: z.string()
});

export type UserInput = z.infer<typeof UserInput>;

export const TextEntry = z.object({
  id: z.string(),
  content: z.string(),
  choices: Choice.array(),
  description: z.string()
});

export type TextEntry = z.infer<typeof TextEntry>;

export interface ChatHistory {
  entries: TextEntry[];
  choices: number[];
}

export const ChatHistory = z.object({
  entries: TextEntry.array(),
  choices: z.number().array()
});

export const PromptResponse = z.object({
  entry: TextEntry
});

export type PromptResponse = z.infer<typeof PromptResponse>;
