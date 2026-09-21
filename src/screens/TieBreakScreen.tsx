import { RESULT_CONTENT, TYPE_PRIORITY_ORDER } from '../data/resultContent'
import { SelectableCard } from '../components/SelectableCard'
import type { TypeId } from '../types'
import styles from './TieBreakScreen.module.css'

interface TieBreakScreenProps {
  tiedTypes: TypeId[]
  onResolve: (type: TypeId) => void
  onBack: () => void
}

/**
 * 공동 1위가 있을 때 진입하는 동점 결정 화면.
 * 제목 문구는 동점 개수에 맞춰 조정한다(SPEC.md §2-B 확정 사항):
 * 정확히 2개면 "두 가지 고민의...", 3개 이상이면 "고민들의..."로 표시.
 */
export function TieBreakScreen({ tiedTypes, onResolve, onBack }: TieBreakScreenProps) {
  const orderedTied = TYPE_PRIORITY_ORDER.filter((type) => tiedTypes.includes(type))
  const title =
    orderedTied.length === 2
      ? '두 가지 고민의 우선순위가 비슷해요.'
      : '고민들의 우선순위가 비슷해요.'

  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <button type="button" className={styles.backButton} onClick={onBack}>
          이전 화면으로
        </button>
      </div>

      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>지금 하나만 먼저 해결한다면 어떤 변화가 더 필요한가요?</p>

      <div className={styles.cards}>
        {orderedTied.map((type) => (
          <SelectableCard
            key={type}
            text={RESULT_CONTENT[type].tieGoal}
            onSelect={() => onResolve(type)}
          />
        ))}
      </div>
    </div>
  )
}
