import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './PrimaryButton.module.css'

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'md' | 'lg'
  fullWidth?: boolean
}

export const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  function PrimaryButton(
    { children, variant = 'primary', size = 'md', fullWidth = false, className, ...rest },
    ref,
  ) {
    const classes = [
      styles.button,
      styles[variant],
      styles[size],
      fullWidth ? styles.fullWidth : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <button ref={ref} className={classes} {...rest}>
        {children}
      </button>
    )
  },
)
