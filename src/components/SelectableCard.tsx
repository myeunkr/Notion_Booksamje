import styles from './SelectableCard.module.css'

interface SelectableCardProps {
  text: string
  selected?: boolean
  onSelect: () => void
  ariaLabel?: string
}

/** 문항 화면의 상황 카드, 동점 결정 화면의 해결 목표 카드에 공통으로 쓰는 큰 선택 카드. */
export function SelectableCard({ text, selected = false, onSelect, ariaLabel }: SelectableCardProps) {
  return (
    <button
      type="button"
      className={`${styles.card} ${selected ? styles.selected : ''}`}
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={ariaLabel}
    >
      <span className={styles.text}>{text}</span>
    </button>
  )
}
