import { QUESTIONS } from '../data/questions'
import { TYPE_PRIORITY_ORDER } from '../data/resultContent'
import { calculateScores, resolveResult } from './scoring'
import type { ScreenStep, StoredState, TypeId } from '../types'

/**
 * localStorage 저장/복원을 전담하는 모듈.
 * - 점수는 저장하지 않고 답변만 저장한다 (scoring.ts가 매번 재계산).
 * - 버전 필드를 포함해, 이후 문항 구조가 바뀌면 오래된 저장 데이터를 안전하게 무시한다.
 * - JSON 파싱 실패 등 손상된 데이터는 항상 초기 상태로 안전하게 폴백한다.
 */

export const STORAGE_KEY = 'notion-yakbang:v1'
export const CURRENT_VERSION = 1

function createOrder(): boolean[] {
  // true = 카드 a가 위, false = 카드 b가 위. 세션 시작 시 1회만 결정한다.
  return QUESTIONS.map(() => Math.random() < 0.5)
}

export function createInitialState(): StoredState {
  return {
    version: CURRENT_VERSION,
    screen: 'start',
    currentIndex: 0,
    answers: QUESTIONS.map(() => null),
    order: createOrder(),
    tieSelection: null,
    completed: false,
  }
}

function isTypeId(value: unknown): value is TypeId {
  return typeof value === 'string' && (TYPE_PRIORITY_ORDER as string[]).includes(value)
}

function isValidScreen(value: unknown): value is ScreenStep {
  return value === 'start' || value === 'question' || value === 'tie' || value === 'result'
}

function isValidAnswers(value: unknown): value is (TypeId | null)[] {
  return (
    Array.isArray(value) &&
    value.length === QUESTIONS.length &&
    value.every((item) => item === null || isTypeId(item))
  )
}

function isValidOrder(value: unknown): value is boolean[] {
  return (
    Array.isArray(value) &&
    value.length === QUESTIONS.length &&
    value.every((item) => typeof item === 'boolean')
  )
}

function isValidStoredState(data: unknown): data is StoredState {
  if (typeof data !== 'object' || data === null) return false
  const candidate = data as Record<string, unknown>

  if (candidate.version !== CURRENT_VERSION) return false
  if (!isValidScreen(candidate.screen)) return false
  if (
    typeof candidate.currentIndex !== 'number' ||
    candidate.currentIndex < 0 ||
    candidate.currentIndex >= QUESTIONS.length
  ) {
    return false
  }
  if (!isValidAnswers(candidate.answers)) return false
  if (!isValidOrder(candidate.order)) return false
  if (candidate.tieSelection !== null && !isTypeId(candidate.tieSelection)) return false
  if (typeof candidate.completed !== 'boolean') return false

  // 화면 단계와 답변 상태의 정합성 확인: tie/result 화면인데 답변이 미완료이거나,
  // result 화면인데 저장된 tieSelection으로 결과를 계산할 수 없다면 손상된 데이터로 간주한다.
  if (
    (candidate.screen === 'tie' || candidate.screen === 'result') &&
    candidate.answers.some((answer) => answer === null)
  ) {
    return false
  }
  if (candidate.screen === 'result') {
    const scores = calculateScores(candidate.answers)
    if (resolveResult(scores, candidate.tieSelection) === null) return false
  }

  return true
}

export function loadState(): StoredState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return createInitialState()

    const parsed: unknown = JSON.parse(raw)
    if (!isValidStoredState(parsed)) return createInitialState()

    return parsed
  } catch {
    return createInitialState()
  }
}

export function saveState(state: StoredState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // localStorage를 사용할 수 없는 환경(프라이빗 모드 등)에서는 저장을 조용히 건너뛴다.
  }
}

/** 검사 다시 하기: 답변/점수/문항 배치 상태를 모두 초기화한다. */
export function resetState(): StoredState {
  const fresh = createInitialState()
  saveState(fresh)
  return fresh
}
