import { useEffect, useState } from 'react'
import { QUESTIONS } from '../data/questions'
import { calculateScores, needsTieBreak } from '../logic/scoring'
import { createInitialState, loadState, resetState, saveState } from '../logic/storage'
import type { StoredState, TypeId } from '../types'

/**
 * 검사 상태를 총괄하는 훅.
 *
 * 화면 진입 규칙: 새로고침을 포함해 앱을 새로 열면 항상 시작 화면(showStart=true)을
 * 먼저 보여준다. 진행 중이던 답변/문항 배치/동점 선택은 localStorage에 그대로 남아
 * 있으므로, 시작 화면의 "이어서 하기"를 누르면 저장된 화면 단계로 정확히 복귀한다.
 * 이 방식으로 "새로고침해도 진행 상태 유지" 요구사항과 "기존 진행 상태가 있으면
 * 이어서 하기/새로 시작하기 제공" 요구사항을 함께 만족한다.
 */
export function useTestState() {
  const [state, setState] = useState<StoredState>(() => loadState())
  const [showStart, setShowStart] = useState(true)

  useEffect(() => {
    saveState(state)
  }, [state])

  const hasProgress = state.screen !== 'start'

  function goToStart() {
    setShowStart(true)
  }

  function resume() {
    setShowStart(false)
  }

  function startNewTest() {
    const fresh = createInitialState()
    fresh.screen = 'question'
    setState(fresh)
    setShowStart(false)
  }

  function answerCurrent(type: TypeId) {
    setState((prev) => {
      const index = prev.currentIndex
      const answers = [...prev.answers]
      answers[index] = type
      const isLast = index === QUESTIONS.length - 1

      if (!isLast) {
        return { ...prev, answers, currentIndex: index + 1, screen: 'question' }
      }

      const scores = calculateScores(answers)
      const tie = needsTieBreak(scores, null)

      return {
        ...prev,
        answers,
        tieSelection: null,
        screen: tie ? 'tie' : 'result',
        completed: !tie,
      }
    })
  }

  function goToPrevious() {
    setState((prev) => {
      if (prev.screen === 'tie') {
        return {
          ...prev,
          screen: 'question',
          currentIndex: QUESTIONS.length - 1,
          tieSelection: null,
        }
      }
      if (prev.currentIndex === 0) return prev
      return { ...prev, currentIndex: prev.currentIndex - 1, screen: 'question' }
    })
  }

  function resolveTie(type: TypeId) {
    setState((prev) => ({ ...prev, tieSelection: type, screen: 'result', completed: true }))
  }

  function resetTest() {
    const fresh = resetState()
    setState(fresh)
    setShowStart(true)
  }

  return {
    state,
    showStart,
    hasProgress,
    goToStart,
    resume,
    startNewTest,
    answerCurrent,
    goToPrevious,
    resolveTie,
    resetTest,
  }
}
