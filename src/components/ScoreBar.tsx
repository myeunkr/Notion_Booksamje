import { TYPE_PRIORITY_ORDER } from '../data/resultContent'
import { RESULT_CONTENT } from '../data/resultContent'
import { MAX_SCORE_PER_TYPE } from '../logic/scoring'
import type { ScoreMap, TypeId } from '../types'
import styles from './ScoreBar.module.css'

interface ScoreBarProps {
  scores: ScoreMap
  maxScore?: number
  highlightTypes?: TypeId[]
}

/** 결과 화면에서 유형별 점수를 막대로 보여준다. 점수를 숨기지 않는다. */
export function ScoreBar({ scores, maxScore = MAX_SCORE_PER_TYPE, highlightTypes = [] }: ScoreBarProps) {
  return (
    <ul className={styles.list}>
      {TYPE_PRIORITY_ORDER.map((type) => {
        const score = scores[type]
        const percent = Math.round((score / maxScore) * 100)
        const highlighted = highlightTypes.includes(type)

        return (
          <li key={type} className={styles.row}>
            <div className={styles.rowHead}>
              <span className={highlighted ? styles.nameHighlighted : styles.name}>
                {RESULT_CONTENT[type].resultName}
              </span>
              <span className={styles.value}>
                {score} / {maxScore}
              </span>
            </div>
            <div className={styles.track}>
              <div
                className={highlighted ? styles.fillHighlighted : styles.fill}
                style={{ width: `${percent}%` }}
              />
            </div>
          </li>
        )
      })}
    </ul>
  )
}
