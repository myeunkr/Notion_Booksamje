interface IconProps {
  className?: string
  size?: number
}

/** 약절구(막자사발) 모티프 - 약방 엠블럼용 */
export function MortarIcon({ className, size = 28 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M11 27c0 7.2 5.8 13 13 13s13-5.8 13-13"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M9 27h30"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M17.5 9.5 30 22"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <circle cx="17" cy="9" r="2.6" fill="currentColor" />
      <path
        d="M22 19c1.8-1.8 4.6-1.8 6.4 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** 약초 잎 모티프 - 섹션 라벨 포인트용 */
export function LeafIcon({ className, size = 16 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4.5 19.5c8-.7 13.5-6.6 14.7-15.5-9 1-14.8 6.7-15.7 15.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M6 18c3.2-4.2 6.6-7.6 11.4-11"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}
