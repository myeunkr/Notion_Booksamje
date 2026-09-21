import { QUESTIONS } from '../data/questions'
import { TYPE_PRIORITY_ORDER } from '../data/resultContent'
import type { ResolvedResult, ScoreMap, TypeId } from '../types'

/**
 * 점수/동점 처리를 담당하는 순수 함수 모음. React UI에 의존하지 않는다.
 * 점수는 별도로 누적 저장하지 않고, 저장된 답변 배열로부터 매번 다시 계산한다
 * (SPEC.md §3-1, §3-3) — 이전 문항으로 돌아가 답변을 바꿔도 재계산만으로
 * 정확한 최신 점수가 반영된다.
 */

export function createEmptyScores(): ScoreMap {
  return TYPE_PRIORITY_ORDER.reduce((acc, type) => {
    acc[type] = 0
    return acc
  }, {} as ScoreMap)
}

export function calculateScores(answers: (TypeId | null)[]): ScoreMap {
  const scores = createEmptyScores()
  for (const answer of answers) {
    if (answer !== null) {
      scores[answer] += 1
    }
  }
  return scores
}

export function isAllAnswered(answers: (TypeId | null)[]): boolean {
  return (
    answers.length === QUESTIONS.length && answers.every((answer) => answer !== null)
  )
}

/** 점수 맵에서 최고점을 공유하는 유형 목록(고정 순서로 정렬됨)을 반환한다. */
export function getTopTypes(scores: ScoreMap): TypeId[] {
  const max = Math.max(...TYPE_PRIORITY_ORDER.map((type) => scores[type]))
  return TYPE_PRIORITY_ORDER.filter((type) => scores[type] === max)
}

/** `excluded`를 제외한 유형들 중 최고점을 공유하는 유형 목록을 반환한다. */
export function getTopTypesExcluding(scores: ScoreMap, excluded: TypeId[]): TypeId[] {
  const remaining = TYPE_PRIORITY_ORDER.filter((type) => !excluded.includes(type))
  if (remaining.length === 0) return []
  const max = Math.max(...remaining.map((type) => scores[type]))
  return remaining.filter((type) => scores[type] === max)
}

/**
 * 여러 유형이 동점으로 남았을 때, 요구사항 문서의 유형 나열 순서를 고정
 * 우선순위로 사용해 하나를 결정한다 (SPEC.md §2-A 확정 사항).
 */
export function pickByPriority(candidates: TypeId[]): TypeId {
  const found = TYPE_PRIORITY_ORDER.find((type) => candidates.includes(type))
  if (!found) {
    throw new Error('pickByPriority: candidates must not be empty')
  }
  return found
}

/**
 * 점수 맵에 공동 1위가 있고, 아직 동점 결정 화면에서 선택하지 않았다면 true.
 * true이면 UI는 결과 화면이 아니라 동점 결정 화면을 보여줘야 한다.
 */
export function needsTieBreak(
  scores: ScoreMap,
  tieSelection: TypeId | null,
): boolean {
  const topTypes = getTopTypes(scores)
  return topTypes.length >= 2 && (tieSelection === null || !topTypes.includes(tieSelection))
}

/**
 * 점수 맵으로부터 최종 결과(주 처방/보조 처방/강도 문구)를 계산한다.
 * 공동 1위인데 아직 tieSelection이 없으면 null을 반환한다(동점 결정 화면 필요).
 */
export function resolveResult(
  scores: ScoreMap,
  tieSelection: TypeId | null,
): ResolvedResult | null {
  const topTypes = getTopTypes(scores)

  if (topTypes.length === 1) {
    const primary = topTypes[0]
    const secondTier = getTopTypesExcluding(scores, [primary])
    const secondary = pickByPriority(secondTier)
    const diff = scores[primary] - scores[secondary]

    return {
      primary,
      secondary,
      strength: diff >= 2 ? 'clear' : 'close',
      scores,
      hadTie: false,
      tieCandidates: [],
    }
  }

  if (tieSelection === null || !topTypes.includes(tieSelection)) {
    return null
  }

  const remainingTied = topTypes.filter((type) => type !== tieSelection)
  const secondary = pickByPriority(remainingTied)

  return {
    primary: tieSelection,
    secondary,
    strength: 'tieResolved',
    scores,
    hadTie: true,
    tieCandidates: topTypes,
  }
}

/** 답변 배열로부터 결과를 계산한다. 모든 문항에 답하지 않았으면 null. */
export function resolveFromAnswers(
  answers: (TypeId | null)[],
  tieSelection: TypeId | null,
): ResolvedResult | null {
  if (!isAllAnswered(answers)) return null
  return resolveResult(calculateScores(answers), tieSelection)
}
