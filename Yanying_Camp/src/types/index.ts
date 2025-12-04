export interface MenuItem {
  name: string
  path: string
}

export interface ImageItem {
  url: string
  tips: string
}

export interface CheckAnswerResult {
  isCorrect: boolean
  overlapChars: string[]
}
