import type { LinkConfig } from '../types'

/**
 * 링크 활성화 여부를 url 값 하나로만 판단한다.
 * data/links.ts에서 실제 URL 문자열만 채워 넣으면 이 함수가 자동으로 true를 반환하므로,
 * 별도의 "활성화" 플래그를 따로 관리할 필요가 없다.
 */
export function isLinkReady(link: LinkConfig): boolean {
  return typeof link.url === 'string' && link.url.trim().length > 0
}
