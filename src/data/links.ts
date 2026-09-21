import type { LinkConfig, TypeId } from '../types'

/**
 * 6개 추천 템플릿 + 방명록 링크를 한곳에서 관리한다.
 *
 * 템플릿과 방명록 페이지가 아직 만들어지지 않은 동안은 `url: null`로 둔다.
 * 활성화 여부는 `url` 값 하나로만 결정되므로(logic/links.ts의 isLinkReady),
 * 나중에 실제 URL 문자열만 채워 넣으면 버튼이 자동으로 활성화된다.
 * 임시 URL이나 "#" 같은 가짜 링크는 절대 넣지 않는다.
 */
export const TEMPLATE_LINKS: Record<TypeId, LinkConfig> = {
  schedule: {
    key: 'schedule',
    label: '학사 일정·과제 마감 대시보드',
    url: null,
  },
  study: {
    key: 'study',
    label: '시험 대비·복습 관리 플래너',
    url: null,
  },
  collaboration: {
    key: 'collaboration',
    label: '팀플 프로젝트 관리 보드',
    url: null,
  },
  organization: {
    key: 'organization',
    label: '강의 노트·자료 보관함',
    url: null,
  },
  habit: {
    key: 'habit',
    label: '주간 목표·습관 트래커',
    url: null,
  },
  archive: {
    key: 'archive',
    label: '대학생활 활동·프로젝트 기록',
    url: null,
  },
}

export const GUESTBOOK_LINK: LinkConfig = {
  key: 'guestbook',
  label: '방명록',
  url: 'https://campusleaders.notion.site/a69619039cb346aab60a7db074bdc9a8?pvs=105',
}

export const LINK_NOT_READY_LABEL = '(준비 중)'
