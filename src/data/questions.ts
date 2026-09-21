import type { Question } from '../types'

/**
 * 15개 비교 문항. 원래 문구를 사용자 검토 후 같은 의미·같은 유형 매핑을 유지하며
 * 더 짧고 직관적으로 다듬었다(선택 부담을 줄이기 위한 목적).
 * 6개 유형(schedule/study/collaboration/organization/habit/archive)의
 * 가능한 모든 조합(C(6,2)=15)이 정확히 한 번씩, 각 유형이 정확히 5회 등장한다.
 * (검증: tests/data-integrity.test.ts)
 */
export const QUESTION_PROMPT =
  '둘 중 지금 나에게 더 불편하거나 먼저 해결하고 싶은 상황은?'

export const QUESTIONS: Question[] = [
  {
    id: 1,
    a: {
      type: 'schedule',
      text: '할 일이 여기저기 흩어져 있어 뭐부터 할지 모르겠다.',
    },
    b: {
      type: 'study',
      text: '어디까지 공부했는지 몰라서 복습 계획을 못 세우겠다.',
    },
  },
  {
    id: 2,
    a: {
      type: 'collaboration',
      text: '팀플 진행 상황을 계속 물어봐야만 알 수 있다.',
    },
    b: {
      type: 'schedule',
      text: '마감이 한꺼번에 겹치면 뭐부터 할지 헷갈린다.',
    },
  },
  {
    id: 3,
    a: {
      type: 'schedule',
      text: '할 일은 알지만 마감 순서로 정리돼 있지 않다.',
    },
    b: {
      type: 'organization',
      text: '분명 적어뒀는데 어디 뒀는지 찾기 어렵다.',
    },
  },
  {
    id: 4,
    a: {
      type: 'habit',
      text: '계획은 세우지만 매일 지켰는지 확인 안 해서 흐지부지된다.',
    },
    b: {
      type: 'schedule',
      text: '중요한 일정을 뒤늦게 알아채 매번 급하게 처리한다.',
    },
  },
  {
    id: 5,
    a: {
      type: 'schedule',
      text: '수업과 활동 일정이 겹치면 조정하기 어렵다.',
    },
    b: {
      type: 'archive',
      text: '활동한 내용을 나중에 설명하려니 남겨둔 게 없다.',
    },
  },
  {
    id: 6,
    a: {
      type: 'study',
      text: '과목별로 어디가 약한지 몰라 공부 순서를 못 정하겠다.',
    },
    b: {
      type: 'collaboration',
      text: '누가 뭘 맡았는지 안 보여서 협업 상황을 알기 어렵다.',
    },
  },
  {
    id: 7,
    a: {
      type: 'organization',
      text: '필기와 참고 자료가 따로 놀아서 같이 보기 불편하다.',
    },
    b: {
      type: 'study',
      text: '예전에 공부한 걸 언제 다시 봐야 할지 모르겠다.',
    },
  },
  {
    id: 8,
    a: {
      type: 'study',
      text: '시험까지 남은 기간에 맞게 공부량을 못 나누겠다.',
    },
    b: {
      type: 'habit',
      text: '목표를 매일 실천할 작은 행동으로 못 바꾸겠다.',
    },
  },
  {
    id: 9,
    a: {
      type: 'archive',
      text: '활동에서 내가 한 일과 성과가 정리돼 있지 않다.',
    },
    b: {
      type: 'study',
      text: '공부한 것과 안 한 것 구분이 잘 안 된다.',
    },
  },
  {
    id: 10,
    a: {
      type: 'collaboration',
      text: '회의에서 정한 것과 할 일이 팀원들에게 명확히 안 전달된다.',
    },
    b: {
      type: 'organization',
      text: '노트와 자료가 쌓여도 과목별로 정리가 안 된다.',
    },
  },
  {
    id: 11,
    a: {
      type: 'habit',
      text: '혼자 세운 목표를 꾸준히 지켰는지 확인하기 어렵다.',
    },
    b: {
      type: 'collaboration',
      text: '역할·마감·파일을 한곳에서 팀원과 공유하기 어렵다.',
    },
  },
  {
    id: 12,
    a: {
      type: 'collaboration',
      text: '팀플 진행 중 서로 업무 상태를 확인하기 어렵다.',
    },
    b: {
      type: 'archive',
      text: '끝난 프로젝트에서 내가 기여한 점을 정리하기 어렵다.',
    },
  },
  {
    id: 13,
    a: {
      type: 'organization',
      text: '자료를 저장해도 분류 기준이 오락가락해서 다시 못 찾는다.',
    },
    b: {
      type: 'habit',
      text: '며칠 못 지키면 계획을 아예 포기하게 된다.',
    },
  },
  {
    id: 14,
    a: {
      type: 'archive',
      text: '지원서·포트폴리오 쓸 때 예전 활동 자료를 다시 모아야 한다.',
    },
    b: {
      type: 'organization',
      text: '시험·과제 때 예전 자료를 빨리 못 찾는다.',
    },
  },
  {
    id: 15,
    a: {
      type: 'habit',
      text: '목표를 정해도 얼마나 지켰는지 눈으로 확인이 안 된다.',
    },
    b: {
      type: 'archive',
      text: '활동하느라 바빠서 과정과 결과를 기록 못 하고 넘어간다.',
    },
  },
]
