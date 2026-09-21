import { beforeEach, describe, expect, it } from 'vitest'
import { QUESTIONS } from '../src/data/questions'
import { createInitialState, loadState, resetState, saveState, STORAGE_KEY } from '../src/logic/storage'

/** vitest 환경(node)에는 localStorage가 없으므로, 테스트에서만 쓰는 최소 메모리 구현을 붙인다. */
class MemoryStorage {
  private store = new Map<string, string>()

  getItem(key: string) {
    return this.store.has(key) ? this.store.get(key)! : null
  }

  setItem(key: string, value: string) {
    this.store.set(key, value)
  }

  removeItem(key: string) {
    this.store.delete(key)
  }

  clear() {
    this.store.clear()
  }
}

beforeEach(() => {
  globalThis.localStorage = new MemoryStorage() as unknown as Storage
})

describe('localStorage 저장/복원', () => {
  it('검사 도중 새로고침해도 답변/문항 인덱스/문항 배치가 그대로 유지된다 (테스트 케이스 11)', () => {
    // 새로고침을 직접 재현할 수는 없지만, 이 앱은 상태 전체를 매 변경마다 localStorage에
    // 저장하고 다음 로드 시 그 값을 그대로 복원하는 구조이므로, "저장 → (새 프로세스에서) 로드"를
    // 그대로 재현하면 새로고침 후 복원 동작과 동일하다.
    const midProgress = createInitialState()
    midProgress.screen = 'question'
    midProgress.currentIndex = 6
    midProgress.answers[0] = 'schedule'
    midProgress.answers[1] = 'collaboration'
    midProgress.answers[2] = 'organization'
    saveState(midProgress)

    // "새로고침"을 흉내내기 위해 저장된 원시 JSON을 다시 파싱해서 읽는다.
    const reloaded = loadState()

    expect(reloaded.screen).toBe('question')
    expect(reloaded.currentIndex).toBe(6)
    expect(reloaded.answers[0]).toBe('schedule')
    expect(reloaded.answers[1]).toBe('collaboration')
    expect(reloaded.answers[2]).toBe('organization')
    expect(reloaded.order).toEqual(midProgress.order)
  })

  it('손상된 JSON 데이터가 있으면 안전하게 초기 상태로 복원한다 (테스트 케이스 12)', () => {
    localStorage.setItem(STORAGE_KEY, '{이것은 잘못된 JSON')

    const state = loadState()
    expect(state.screen).toBe('start')
    expect(state.completed).toBe(false)
    expect(state.answers.every((answer) => answer === null)).toBe(true)
  })

  it('스키마에 맞지 않는 데이터(버전 불일치 등)도 초기 상태로 복원한다 (테스트 케이스 12)', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 999, screen: 'result' }))

    const state = loadState()
    expect(state.version).toBe(1)
    expect(state.screen).toBe('start')
  })

  it('화면 단계와 답변이 어긋난 데이터(예: 미완료인데 result 화면)도 초기 상태로 복원한다 (테스트 케이스 12)', () => {
    const broken = createInitialState()
    broken.screen = 'result'
    // answers를 채우지 않은 채로 result 화면인 손상된 상태를 흉내낸다.
    localStorage.setItem(STORAGE_KEY, JSON.stringify(broken))

    const state = loadState()
    expect(state.screen).toBe('start')
  })

  it('검사 재시작 시 답변/점수/문항 배치 상태가 모두 초기화된다 (테스트 케이스 13)', () => {
    const inProgress = createInitialState()
    inProgress.screen = 'question'
    inProgress.currentIndex = 7
    inProgress.answers[0] = 'schedule'
    saveState(inProgress)
    expect(localStorage.getItem(STORAGE_KEY)).not.toBeNull()

    const fresh = resetState()
    expect(fresh.screen).toBe('start')
    expect(fresh.currentIndex).toBe(0)
    expect(fresh.answers.every((answer) => answer === null)).toBe(true)
    expect(fresh.completed).toBe(false)
    expect(fresh.tieSelection).toBeNull()
    expect(fresh.order).toHaveLength(QUESTIONS.length)

    // 실제로 저장소에도 반영되었는지 확인한다.
    const reloaded = loadState()
    expect(reloaded.answers.every((answer) => answer === null)).toBe(true)
  })
})
