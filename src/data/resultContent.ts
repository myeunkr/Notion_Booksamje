import type { ResultContent, TypeId } from '../types'

/**
 * 요구사항 "검사 유형" 섹션에 나열된 순서. 동점 처리 시 보조 처방을 하나로
 * 좁혀야 하는 경우(SPEC.md §2-A) 이 순서를 고정 우선순위로 사용한다.
 */
export const TYPE_PRIORITY_ORDER: TypeId[] = [
  'schedule',
  'study',
  'collaboration',
  'organization',
  'habit',
  'archive',
]

/**
 * 6개 유형의 결과 콘텐츠(결과명/한 줄 처방/설명/추천 템플릿/동점 화면 해결 목표).
 * 문구는 요구사항 원문 그대로이며 임의로 수정하지 않는다.
 */
export const RESULT_CONTENT: Record<TypeId, ResultContent> = {
  schedule: {
    id: 'schedule',
    resultName: '마감 구조화 처방',
    onelineRx: '흩어진 일정을 한곳에 모으고, 오늘 해야 할 일부터 확인하세요.',
    description:
      '해야 할 일은 알고 있지만 일정과 마감이 한곳에 정리되어 있지 않아 중요한 일을 놓치기 쉬운 상태예요. 마감일과 우선순위를 한눈에 확인하는 시스템이 필요합니다.',
    templateName: '학사 일정·과제 마감 대시보드',
    linkKey: 'schedule',
    tieGoal: '이번 주 해야 할 일과 마감 순서를 한눈에 확인하고 싶다.',
  },
  study: {
    id: 'study',
    resultName: '학습 루틴 처방',
    onelineRx: '공부량보다 먼저, 언제 무엇을 복습할지 보이게 만드세요.',
    description:
      '공부해야 할 내용은 많지만 진도와 복습 주기가 정리되지 않아 시험 직전에 부담이 커질 수 있어요. 학습 과정이 보이는 루틴이 필요합니다.',
    templateName: '시험 대비·복습 관리 플래너',
    linkKey: 'study',
    tieGoal: '과목별 공부 범위와 복습 시점을 한눈에 확인하고 싶다.',
  },
  collaboration: {
    id: 'collaboration',
    resultName: '협업 정리 처방',
    onelineRx: '팀원이 더 많이 소통하게 하기보다, 같은 정보를 보게 만드세요.',
    description:
      '역할과 진행 상황이 공유되지 않으면 협업에 필요한 확인과 소통이 늘어날 수 있어요. 모두가 같은 화면에서 업무 상태를 확인할 수 있는 공간이 필요합니다.',
    templateName: '팀플 프로젝트 관리 보드',
    linkKey: 'collaboration',
    tieGoal: '팀원의 역할과 프로젝트 진행 상황을 한눈에 확인하고 싶다.',
  },
  organization: {
    id: 'organization',
    resultName: '지식 정리 처방',
    onelineRx: '기록의 양보다 다시 찾을 수 있는 구조가 중요합니다.',
    description:
      '열심히 기록하고 있지만 필요한 순간에 다시 찾기 어렵다면 기록이 충분히 활용되지 못하고 있는 상태예요. 자료와 필기를 연결하는 정리 체계가 필요합니다.',
    templateName: '강의 노트·자료 보관함',
    linkKey: 'organization',
    tieGoal: '강의 필기와 자료를 필요할 때 바로 찾고 싶다.',
  },
  habit: {
    id: 'habit',
    resultName: '습관 지속 처방',
    onelineRx: '완벽한 하루보다 반복 가능한 하루를 설계하세요.',
    description:
      '의지가 부족한 것이 아니라 목표가 일상적인 행동으로 충분히 작게 나뉘지 않았을 수 있어요. 부담 없이 지속할 수 있는 기록 방식이 필요합니다.',
    templateName: '주간 목표·습관 트래커',
    linkKey: 'habit',
    tieGoal: '작은 목표를 꾸준히 실천하고 진행 상황을 확인하고 싶다.',
  },
  archive: {
    id: 'archive',
    resultName: '경험 아카이빙 처방',
    onelineRx: '경험이 끝난 뒤 기억하려 하지 말고, 진행하면서 남기세요.',
    description:
      '다양한 경험을 하고 있지만 과정과 성과가 정리되지 않아 나중에 활용하기 어려울 수 있어요. 활동이 끝나기 전에 핵심 내용을 축적하는 기록 공간이 필요합니다.',
    templateName: '대학생활 활동·프로젝트 기록',
    linkKey: 'archive',
    tieGoal: '활동 과정과 성과를 나중에 활용할 수 있도록 기록하고 싶다.',
  },
}

export const RESULT_STRENGTH_TEXT = {
  clear: '현재 가장 우선적인 고민이 비교적 뚜렷하게 나타났어요.',
  close: '두 가지 고민이 함께 나타났으며, 그중 이 처방이 조금 더 우선이에요.',
  tieResolved:
    '두 가지 이상의 고민이 비슷하게 나타나, 지금 먼저 해결하고 싶은 고민을 기준으로 처방했어요.',
} as const
