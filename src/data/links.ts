import type { LinkConfig, TypeId } from '../types'

/**
 * 4개 추천 템플릿 + 방명록 링크를 한곳에서 관리한다.
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
    url: null, // 변경 가능성으로 비활성화. 이전 값: https://app.notion.com/p/6f6cc72978134461a2715700a497c2cb?pvs=21
  },
  collaboration: {
    key: 'collaboration',
    label: '팀플 프로젝트 관리 보드',
    url: null, // 변경 가능성으로 비활성화. 이전 값: https://app.notion.com/p/ea3d6e6f8e524b438a2d2b6a7885c71b?pvs=21
  },
  organization: {
    key: 'organization',
    label: '강의 노트·자료 보관함',
    url: null, // 변경 가능성으로 비활성화. 이전 값: https://app.notion.com/p/a31a4dc74bee4e749fa0d556a885668f?pvs=21
  },
  habit: {
    key: 'habit',
    label: '주간 목표·습관 트래커',
    url: null, // 변경 가능성으로 비활성화. 이전 값: https://app.notion.com/p/a91a5a51bb0f458b8de0d118ebdf2bd9?pvs=21
  },
}

export const GUESTBOOK_LINK: LinkConfig = {
  key: 'guestbook',
  label: '방명록',
  url: 'https://campusleaders.notion.site/a69619039cb346aab60a7db074bdc9a8?pvs=105',
}

export const LINK_NOT_READY_LABEL = '(준비 중)'
