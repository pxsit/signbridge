export interface Sign {
  id: number;
  word: string;
  category: string;
  gifUrl: string | null;
  gifPlaceholderLabel: string;
  exampleSentence: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | string;
  tags: string[];
}
