import { useState } from 'react'
import { PrimaryButton } from '../components/PrimaryButton'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { MortarIcon } from '../components/icons'
import styles from './StartScreen.module.css'

interface StartScreenProps {
  hasProgress: boolean
  onStart: () => void
  onResume: () => void
  onRestart: () => void
}

export function StartScreen({ hasProgress, onStart, onResume, onRestart }: StartScreenProps) {
  const [confirmOpen, setConfirmOpen] = useState(false)

  return (
    <div className={styles.screen}>
      <div className={styles.hero}>
        <div className={styles.emblem} aria-hidden="true">
          <MortarIcon className={styles.emblemIcon} size={30} />
        </div>
        <div className={styles.badge}>
          <img
            className={styles.badgeIcon}
            src={`${import.meta.env.BASE_URL}campus-leader-badge.webp`}
            alt="부산대학교 노션 캠퍼스 리더 배지"
            width={36}
            height={36}
          />
          <span className={styles.badgeText}>부산대학교 노션 캠퍼스 리더</span>
        </div>
        <p className={styles.eyebrow}>노션 약방 : 대학생활 고민처방소</p>
        <h1 className={styles.title}>학교생활 고민 유형검사</h1>
        <div className={styles.ornament} aria-hidden="true">
          <span />
          <span className={styles.ornamentMark}>◆</span>
          <span />
        </div>
        <p className={styles.tagline}>지금 나에게 먼저 필요한 노션 처방을 확인해 보세요.</p>
        <p className={styles.meta}>15문항 · 약 1분</p>
      </div>

      <div className={styles.bottom}>
        <div className={styles.actions}>
          {hasProgress ? (
            <>
              <PrimaryButton fullWidth size="lg" onClick={onResume}>
                이어서 하기
              </PrimaryButton>
              <PrimaryButton fullWidth variant="secondary" onClick={() => setConfirmOpen(true)}>
                새로 시작하기
              </PrimaryButton>
            </>
          ) : (
            <PrimaryButton fullWidth size="lg" onClick={onStart}>
              검사 시작
            </PrimaryButton>
          )}
        </div>

        <p className={styles.disclaimer}>
          이 검사는 전문적인 심리검사가 아닌, 현재 학교생활에서 먼저 해결하고 싶은 고민을
          확인하기 위한 간단한 유형검사입니다. 응답은 기기에만 저장되며 외부로 전송되지
          않습니다.
        </p>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="새로 시작할까요?"
        description="지금까지의 답변과 진행 상태가 모두 사라져요. 다시 시작할까요?"
        confirmLabel="새로 시작"
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
