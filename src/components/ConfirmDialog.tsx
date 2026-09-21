import { useEffect, useRef } from 'react'
import { PrimaryButton } from './PrimaryButton'
import styles from './ConfirmDialog.module.css'

interface ConfirmDialogProps {
  open: boolean
  title: string
  description?: string
  confirmLabel: string
  cancelLabel: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    cancelRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onCancel()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onCancel])

  if (!open) return null

  return (
    <div className={styles.overlay} role="presentation">
      <div
        className={styles.dialog}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby={description ? 'confirm-dialog-description' : undefined}
      >
        <h2 id="confirm-dialog-title" className={styles.title}>
          {title}
        </h2>
        {description ? (
          <p id="confirm-dialog-description" className={styles.description}>
            {description}
          </p>
        ) : null}
        <div className={styles.actions}>
          <PrimaryButton ref={cancelRef} variant="secondary" fullWidth onClick={onCancel}>
            {cancelLabel}
          </PrimaryButton>
          <PrimaryButton variant="danger" fullWidth onClick={onConfirm}>
            {confirmLabel}
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}
