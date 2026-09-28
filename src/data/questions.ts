import type { Question } from '../types'

/**
 * 6개 비교 문항. 유형이 6개(schedule/study/collaboration/organization/habit/archive)에서
 * 4개(schedule/collaboration/organization/habit)로 줄어들면서(study는 schedule에 통합,
 * archive는 삭제) 다시 "4개 유형의 모든 조합"을 빠짐없이 비교하는 완전 설계로 되돌렸다
 * (C(4,2)=6). 문항 문구는 전에 사용자가 검토·승인한 간결한 버전을 그대로 재사용했다.
 * 6개 유형이 4개로 재구성될 때 삭제된 유형이 들어 있던 문항(schedule-study,
 * organization-study, study-habit, schedule-archive, collaboration-archive,
 * archive-organization, habit-archive)은 자연히 제외됐다.
 * (검증: tests/data-integrity.test.ts)
 */
export const QUESTION_PROMPT =
  '둘 중 지금 나에게 더 불편하거나 먼저 해결하고 싶은 상황은?'

export const QUESTIONS: Question[] = [
  {
    id: 1,
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
    id: 2,
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
      type: 'collaboration',
      text: '회의에서 정한 것과 할 일이 팀원들에게 명확히 안 전달된다.',
    },
    b: {
      type: 'organization',
      text: '노트와 자료가 쌓여도 과목별로 정리가 안 된다.',
    },
  },
  {
    id: 5,
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
    id: 6,
    a: {
      type: 'organization',
      text: '자료를 저장해도 분류 기준이 오락가락해서 다시 못 찾는다.',
    },
    b: {
      type: 'habit',
      text: '며칠 못 지키면 계획을 아예 포기하게 된다.',
    },
  },
]
