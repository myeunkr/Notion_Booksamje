import { useState } from 'react'
import { SelectableCard } from '../components/SelectableCard'
import { ProgressBar } from '../components/ProgressBar'
import { QUESTION_PROMPT } from '../data/questions'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import type { Question, TypeId } from '../types'
import styles from './QuestionScreen.module.css'

interface QuestionScreenProps {
  question: Question
  order: boolean
  selectedType: TypeId | null
  currentNumber: number
  totalQuestions: number
  canGoPrev: boolean
  onSelect: (type: TypeId) => void
  onPrev: () => void
  onLogoClick: () => void
}

/**
 * 15문항 공용 검사 화면. 선택 즉시 시각적으로 표시한 뒤 약 200ms 뒤에
 * 실제 다음 문항으로 전환한다(동작 감소 설정 시 지연 없음).
 * 부모에서 question.id를 key로 넘겨 문항이 바뀔 때마다 이 컴포넌트가
 * 새로 마운트되어 내부 상태가 자동으로 초기화된다.
 */
export function QuestionScreen({
  question,
  order,
  selectedType,
  currentNumber,
  totalQuestions,
  canGoPrev,
  onSelect,
  onPrev,
  onLogoClick,
}: QuestionScreenProps) {
  const [visualSelected, setVisualSelected] = useState<TypeId | null>(selectedType)
  const [isAdvancing, setIsAdvancing] = useState(false)
  const reducedMotion = usePrefersReducedMotion()

  const topOption = order ? question.a : question.b
  const bottomOption = order ? question.b : question.a

  function handleSelect(type: TypeId) {
    if (isAdvancing) return
    setVisualSelected(type)
    setIsAdvancing(true)
    const delay = reducedMotion ? 0 : 200
    window.setTimeout(() => {
      onSelect(type)
    }, delay)
  }

  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <button type="button" className={styles.logo} onClick={onLogoClick}>
          노션 약방
        </button>
        <ProgressBar current={currentNumber} total={totalQuestions} />
      </div>

      <p className={styles.prompt}>{QUESTION_PROMPT}</p>

      <div className={styles.cards}>
        <SelectableCard
          text={topOption.text}
          selected={visualSelected === topOption.type}
          onSelect={() => handleSelect(topOption.type)}
          ariaLabel={`상황 1: ${topOption.text}`}
        />
        <SelectableCard
          text={bottomOption.text}
          selected={visualSelected === bottomOption.type}
          onSelect={() => handleSelect(bottomOption.type)}
          ariaLabel={`상황 2: ${bottomOption.text}`}
        />
      </div>

      <div className={styles.bottom}>
        <button
          type="button"
          className={styles.prevButton}
          onClick={onPrev}
          disabled={!canGoPrev || isAdvancing}
        >
          이전
        </button>
      </div>
    </div>
  )
}
