import { describe, expect, it } from 'vitest'
import { QUESTIONS } from '../src/data/questions'
import { TYPE_PRIORITY_ORDER } from '../src/data/resultContent'
import {
  calculateScores,
  createEmptyScores,
  getTopTypes,
  isAllAnswered,
  MAX_SCORE_PER_TYPE,
  needsTieBreak,
  resolveFromAnswers,
  resolveResult,
} from '../src/logic/scoring'
import type { ScoreMap, TypeId } from '../src/types'

/**
 * 특정 유형이 나오는 문항은 그 유형을 선택하고, 나머지 문항은 그때까지 점수가 더 낮은
 * 쪽을 선택해(균형 배분) 어느 한 유형이 몰아서 preferredType과 동점이 되지 않게 만든다.
 * 9문항 설계는 모든 조합을 비교하지 않으므로(유형마다 3문항만 등장), 단순히 한쪽만
 * 계속 고르면 다른 유형이 preferredType과 점수가 같아질 수 있어 이 균형 배분이 필요하다.
 */
function buildAnswersPreferring(preferredType: TypeId): (TypeId | null)[] {
  const running = createEmptyScores()
  return QUESTIONS.map((question) => {
    if (question.a.type === preferredType || question.b.type === preferredType) {
      running[preferredType] += 1
      return preferredType
    }
    const pick = running[question.a.type] <= running[question.b.type] ? question.a.type : question.b.type
    running[pick] += 1
    return pick
  })
}

describe('calculateScores / resolveFromAnswers', () => {
  // 테스트 케이스 1~6: 6개 유형이 각각 단독 1위가 되는 경우.
  it.each(TYPE_PRIORITY_ORDER)('%s이 단독 1위인 경우 주 처방으로 계산된다', (type) => {
    const answers = buildAnswersPreferring(type)
    const scores = calculateScores(answers)
    expect(scores[type]).toBe(MAX_SCORE_PER_TYPE)
    for (const other of TYPE_PRIORITY_ORDER) {
      if (other !== type) expect(scores[other]).toBeLessThan(MAX_SCORE_PER_TYPE)
    }

    const result = resolveFromAnswers(answers, null)
    expect(result).not.toBeNull()
    expect(result?.hadTie).toBe(false)
    expect(result?.primary).toBe(type)
  })

  it('이전 문항으로 돌아가 답변을 변경하면 점수가 정확히 갱신된다 (테스트 케이스 10)', () => {
    const answers = buildAnswersPreferring('schedule')
    const before = calculateScores(answers)

    const q1Index = QUESTIONS.findIndex((question) => question.id === 1) // schedule vs study
    const changed = [...answers]
    changed[q1Index] = 'study'

    const after = calculateScores(changed)
    expect(after.schedule).toBe(before.schedule - 1)
    expect(after.study).toBe(before.study + 1)
  })

  it('모든 문항에 답하지 않았으면 결과를 계산하지 않는다 (추가 가드 테스트)', () => {
    const answers = buildAnswersPreferring('schedule')
    answers[answers.length - 1] = null

    expect(isAllAnswered(answers)).toBe(false)
    expect(resolveFromAnswers(answers, null)).toBeNull()
  })
})

describe('동점 처리', () => {
  it('여섯 유형이 모두 동점이면(실제 응답으로는 도달 불가하여 점수를 직접 주입) 동점 결정이 필요하다고 판단한다 (추가 가드 테스트)', () => {
    // 9문항의 총점은 항상 9이고 6개 유형으로는 나누어떨어지지 않아(1.5점) 실제 응답으로는
    // 6개 유형이 모두 동점일 수 없다. SPEC.md §2-C에 따라 동점 처리 순수 함수에
    // 인위적인 점수 배열을 직접 주입해 로직만 검증한다.
    const evenScores: ScoreMap = {
      schedule: 2,
      study: 2,
      collaboration: 2,
      organization: 2,
      habit: 2,
      archive: 2,
    }

    expect(getTopTypes(evenScores)).toEqual(TYPE_PRIORITY_ORDER)
    expect(needsTieBreak(evenScores, null)).toBe(true)
    expect(resolveResult(evenScores, null)).toBeNull()

    const resolved = resolveResult(evenScores, 'habit')
    expect(resolved).not.toBeNull()
    expect(resolved?.primary).toBe('habit')
    expect(resolved?.hadTie).toBe(true)
    // 나머지 5개 동점 유형 중 고정 우선순위(요구사항의 유형 나열 순서)상 가장 앞선 schedule이 보조 처방
    expect(resolved?.secondary).toBe('schedule')
  })

  it('두 유형이 공동 1위면 동점 결정 화면이 필요하고, 선택 후 나머지가 보조 처방이 된다 (테스트 케이스 7)', () => {
    const scores: ScoreMap = {
      schedule: 3,
      study: 3,
      collaboration: 2,
      organization: 2,
      habit: 1,
      archive: 0,
    }

    expect(getTopTypes(scores)).toEqual(['schedule', 'study'])
    expect(needsTieBreak(scores, null)).toBe(true)
    expect(resolveResult(scores, null)).toBeNull()

    const resolved = resolveResult(scores, 'study')
    expect(resolved?.primary).toBe('study')
    expect(resolved?.secondary).toBe('schedule')
    expect(resolved?.strength).toBe('tieResolved')
  })

  it('세 유형 이상이 공동 1위면 선택한 유형이 주 처방, 나머지 중 고정 우선순위가 보조 처방이 된다 (테스트 케이스 8)', () => {
    const scores: ScoreMap = {
      schedule: 3,
      study: 3,
      collaboration: 3,
      organization: 2,
      habit: 1,
      archive: 0,
    }

    const top = getTopTypes(scores)
    expect(top).toEqual(['schedule', 'study', 'collaboration'])

    const resolved = resolveResult(scores, 'collaboration')
    expect(resolved?.primary).toBe('collaboration')
    expect(resolved?.secondary).toBe('schedule')
    expect(resolved?.tieCandidates).toEqual(['schedule', 'study', 'collaboration'])
  })

  it('1위는 단독이고 2위가 여러 유형으로 동점이면, 고정 우선순위로 보조 처방 하나를 결정한다 (테스트 케이스 9)', () => {
    // schedule 단독 1위(3점), study/collaboration/organization이 1점으로 공동 2위.
    // 1위 동점이 아니므로 동점 결정 화면 없이 바로 확정되어야 하고,
    // 보조 처방은 2위 동점 후보 중 TYPE_PRIORITY_ORDER상 가장 앞선 study가 되어야 한다.
    const scores: ScoreMap = {
      schedule: 3,
      study: 1,
      collaboration: 1,
      organization: 1,
      habit: 0,
      archive: 0,
    }

    expect(getTopTypes(scores)).toEqual(['schedule'])

    const resolved = resolveResult(scores, null)
    expect(resolved).not.toBeNull()
    expect(resolved?.hadTie).toBe(false)
    expect(resolved?.primary).toBe('schedule')
    expect(resolved?.secondary).toBe('study')
    // 1위-2위 점수차가 2점(>=2)이므로 강도 문구는 'clear'
    expect(resolved?.strength).toBe('clear')
  })

  it('공동 1위 상태에서 아직 선택하지 않았다면 결과를 확정하지 않는다', () => {
    const scores: ScoreMap = {
      schedule: 3,
      study: 3,
      collaboration: 3,
      organization: 2,
      habit: 1,
      archive: 0,
    }
    expect(resolveResult(scores, null)).toBeNull()
    // 동점 후보가 아닌 유형을 선택으로 넘겨도 확정하지 않는다.
    expect(resolveResult(scores, 'organization')).toBeNull()
  })
})
