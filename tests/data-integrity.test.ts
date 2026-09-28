import { describe, expect, it } from 'vitest'
import { QUESTIONS } from '../src/data/questions'
import { TYPE_PRIORITY_ORDER } from '../src/data/resultContent'
import type { TypeId } from '../src/types'

describe('문항 데이터 무결성', () => {
  it('총 6개 문항이다', () => {
    expect(QUESTIONS.length).toBe(6)
  })

  it('각 유형은 6문항 전체에서 정확히 3번씩 등장한다', () => {
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

  it('4개 유형의 가능한 6개 조합이 중복 없이 정확히 한 번씩 존재한다', () => {
    const pairKey = (a: TypeId, b: TypeId) => [a, b].sort().join('-')
    const seen = new Set<string>()

    for (const question of QUESTIONS) {
      const key = pairKey(question.a.type, question.b.type)
      expect(seen.has(key)).toBe(false)
      seen.add(key)
    }

    const expectedPairCount =
      (TYPE_PRIORITY_ORDER.length * (TYPE_PRIORITY_ORDER.length - 1)) / 2
    expect(seen.size).toBe(expectedPairCount)
    expect(QUESTIONS.length).toBe(expectedPairCount)
  })
})
