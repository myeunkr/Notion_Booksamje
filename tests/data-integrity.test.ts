import { describe, expect, it } from 'vitest'
import { QUESTIONS } from '../src/data/questions'
import { TYPE_PRIORITY_ORDER } from '../src/data/resultContent'
import type { TypeId } from '../src/types'

/**
 * 9문항 설계: 6개 유형을 자기관리(schedule/study/habit)와 정보·관계관리
 * (collaboration/organization/archive) 두 그룹으로 나눠, 그룹 내부 3쌍씩(총 6개) +
 * 그룹 간 짝지어진 3쌍(schedule-collaboration, study-organization, habit-archive)을
 * 더해 총 9개 조합을 선택했다. 원래의 15개 완전 조합 중 의도적으로 제외한 6개다.
 */
const EXPECTED_PAIRS: [TypeId, TypeId][] = [
  ['schedule', 'study'],
  ['schedule', 'collaboration'],
  ['schedule', 'habit'],
  ['study', 'organization'],
  ['study', 'habit'],
  ['collaboration', 'organization'],
  ['collaboration', 'archive'],
  ['organization', 'archive'],
  ['habit', 'archive'],
]

describe('문항 데이터 무결성', () => {
  it('총 9개 문항이다', () => {
    expect(QUESTIONS.length).toBe(9)
  })

  it('각 유형은 9문항 전체에서 정확히 3번씩 등장한다 (균형 유지 확인)', () => {
    const counts = TYPE_PRIORITY_ORDER.reduce(
      (acc, type) => {
        acc[type] = 0
        return acc
      },
      {} as Record<TypeId, number>,
    )

    for (const question of QUESTIONS) {
      counts[question.a.type] += 1
      counts[question.b.type] += 1
    }

    for (const type of TYPE_PRIORITY_ORDER) {
      expect(counts[type]).toBe(3)
    }
  })

  it('설계된 9개 조합이 중복 없이 정확히 한 번씩, 의도한 조합과 일치한다', () => {
    const pairKey = (a: TypeId, b: TypeId) => [a, b].sort().join('-')
    const seen = new Set<string>()

    for (const question of QUESTIONS) {
      const key = pairKey(question.a.type, question.b.type)
      expect(seen.has(key)).toBe(false)
      seen.add(key)
    }

    const expectedKeys = new Set(EXPECTED_PAIRS.map(([a, b]) => pairKey(a, b)))
    expect(seen).toEqual(expectedKeys)
  })
})
