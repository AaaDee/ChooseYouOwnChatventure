export interface Choice {
  index: number;
  content: string;
}
export interface TextEntry {
  id: string;
  content: string;
  choices: Choice[];
}
