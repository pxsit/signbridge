export interface StoryQuestion {
  q: string;
  choices: string[];
  answer: string;
}

export interface Story {
  id: string;
  title: string;
  lines: string[];
  highlightedWords: string[];
  questions: StoryQuestion[];
}
