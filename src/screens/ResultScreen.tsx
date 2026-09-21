import { useState } from 'react'
import { PrimaryButton } from '../components/PrimaryButton'
import { ScoreBar } from '../components/ScoreBar'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { RESULT_CONTENT, RESULT_STRENGTH_TEXT } from '../data/resultContent'
import { GUESTBOOK_LINK, LINK_NOT_READY_LABEL, TEMPLATE_LINKS } from '../data/links'
import { isLinkReady } from '../logic/links'
import { LeafIcon } from '../components/icons'
import type { LinkConfig, ResolvedResult } from '../types'
import styles from './ResultScreen.module.css'

interface ResultScreenProps {
  result: ResolvedResult
  onRestart: () => void
}

export function ResultScreen({ result, onRestart }: ResultScreenProps) {
  const [confirmOpen, setConfirmOpen] = useState(false)

  const primaryContent = RESULT_CONTENT[result.primary]
  const secondaryContent = RESULT_CONTENT[result.secondary]
  const templateLink = TEMPLATE_LINKS[result.primary]

  function openLink(link: LinkConfig) {
    if (!isLinkReady(link)) return
    window.open(link.url as string, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className={styles.screen}>
      <div className={styles.prescription}>
        <div className={styles.stampBar}>
          <span className={styles.stamp}>오늘의 진단</span>
          <span className={styles.seal} aria-hidden="true">
            方
          </span>
        </div>

        <div className={styles.body}>
          <h1 className={styles.resultName}>{primaryContent.resultName}</h1>
          <p className={styles.strength}>{RESULT_STRENGTH_TEXT[result.strength]}</p>

          <div className={styles.ornamentDivider} aria-hidden="true">
            <span />
            <span className={styles.ornamentMark}>◆</span>
            <span />
          </div>

          <p className={styles.description}>{primaryContent.description}</p>

          <div className={styles.rxBlock}>
            <p className={styles.rxLabel}>
              <LeafIcon className={styles.labelIcon} />한 줄 처방
            </p>
            <p className={styles.rxText}>{primaryContent.onelineRx}</p>
          </div>

          <div className={styles.templateBlock}>
            <p className={styles.templateLabel}>
              <LeafIcon className={styles.labelIcon} />추천 템플릿
            </p>
            <p className={styles.templateName}>{primaryContent.templateName}</p>
            <PrimaryButton
              fullWidth
              size="lg"
              disabled={!isLinkReady(templateLink)}
              onClick={() => openLink(templateLink)}
            >
              처방 템플릿 열기{!isLinkReady(templateLink) && ` ${LINK_NOT_READY_LABEL}`}
            </PrimaryButton>
            <p className={styles.presentNotice}>처방전을 노션 약사에게 보여주세요!</p>
          </div>
        </div>

        <div className={styles.perforation} aria-hidden="true" />

        <details className={styles.secondaryBlock}>
          <summary className={styles.secondarySummary}>
            보조 처방 보기 <span className={styles.secondaryName}>{secondaryContent.resultName}</span>
          </summary>
          <p className={styles.secondaryRx}>{secondaryContent.onelineRx}</p>
        </details>

        <div className={styles.ornamentDivider} aria-hidden="true">
          <span />
          <span className={styles.ornamentMark}>◆</span>
          <span />
        </div>

        <div className={styles.scoreBlock}>
          <p className={styles.scoreLabel}>
            <LeafIcon className={styles.labelIcon} />유형별 점수
          </p>
          <ScoreBar scores={result.scores} highlightTypes={[result.primary, result.secondary]} />
        </div>
      </div>

      <div className={styles.actions}>
        <PrimaryButton
          fullWidth
          variant="secondary"
          disabled={!isLinkReady(GUESTBOOK_LINK)}
          onClick={() => openLink(GUESTBOOK_LINK)}
        >
          방명록 작성하기{!isLinkReady(GUESTBOOK_LINK) && ` ${LINK_NOT_READY_LABEL}`}
        </PrimaryButton>
        <PrimaryButton fullWidth variant="ghost" onClick={() => setConfirmOpen(true)}>
          다시 검사하기
        </PrimaryButton>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="검사를 다시 할까요?"
        description="지금까지의 답변과 진행 상태가 모두 사라져요. 다시 시작할까요?"
        confirmLabel="다시 검사하기"
        cancelLabel="취소"
        onConfirm={() => {
          setConfirmOpen(false)
          onRestart()
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  )
}
