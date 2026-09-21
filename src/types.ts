export type TypeId =
  | 'schedule'
  | 'study'
  | 'collaboration'
  | 'organization'
  | 'habit'
  | 'archive'

export interface QuestionOption {
  type: TypeId
  text: string
}

export interface Question {
  id: number
  a: QuestionOption
  b: QuestionOption
}

export interface ResultContent {
  id: TypeId
  resultName: string
  onelineRx: string
  description: string
  templateName: string
  linkKey: string
  tieGoal: string
}

export interface LinkConfig {
  key: string
  label: string
  url: string | null
}

export type ScreenStep = 'start' | 'question' | 'tie' | 'result'

export interface StoredState {
  version: number
  screen: ScreenStep
  currentIndex: number
  answers: (TypeId | null)[]
  order: boolean[]
  tieSelection: TypeId | null
  completed: boolean
}

export type ScoreMap = Record<TypeId, number>

export type ResultStrength = 'clear' | 'close' | 'tieResolved'

export interface ResolvedResult {
  primary: TypeId
  secondary: TypeId
  strength: ResultStrength
  scores: ScoreMap
  hadTie: boolean
  tieCandidates: TypeId[]
}
