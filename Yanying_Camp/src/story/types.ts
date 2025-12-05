export interface Choice {
  text: string;
  to: string; // chapterId or "ending:endingId"
}

export interface Chapter {
  id: string;
  title: string;
  body: string;
  choices: Choice[];
}

export interface Ending {
  id: string;
  title: string;
  desc: string;
}
