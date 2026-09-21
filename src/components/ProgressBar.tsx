import styles from './ProgressBar.module.css'

interface ProgressBarProps {
  current: number
  total: number
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = Math.min(100, Math.round((current / total) * 100))

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>
        {current} / {total}
      </span>
      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label="검사 진행률"
      >
        <div className={styles.fill} style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}
