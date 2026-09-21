import type { Question } from '../types'

/**
 * 15개 비교 문항. 문구는 요구사항 원문 그대로이며 임의로 수정하지 않는다.
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
      text: '과제·시험·약속이 흩어져 있어 이번 주의 우선순위를 정하기 어렵다.',
    },
    b: {
      type: 'study',
      text: '공부한 범위와 다음 복습 시점을 파악하기 어려워 시험 준비가 막막하다.',
    },
  },
  {
    id: 2,
    a: {
      type: 'collaboration',
      text: '팀플에서 담당자와 진행 상황을 계속 물어봐야 전체 상황을 알 수 있다.',
    },
    b: {
      type: 'schedule',
      text: '여러 마감이 겹치면 무엇부터 처리해야 하는지 판단하기 어렵다.',
    },
  },
  {
    id: 3,
    a: {
      type: 'schedule',
      text: '해야 할 일을 알고 있어도 마감 순서대로 정리되어 있지 않다.',
    },
    b: {
      type: 'organization',
      text: '기록한 내용이 있어도 어느 파일이나 페이지에 있는지 다시 찾기 어렵다.',
    },
  },
  {
    id: 4,
    a: {
      type: 'habit',
      text: '계획을 세워도 매일 실행했는지 확인하지 않아 흐지부지된다.',
    },
    b: {
      type: 'schedule',
      text: '중요한 일정을 뒤늦게 발견해 급하게 처리하는 일이 반복된다.',
    },
  },
  {
    id: 5,
    a: {
      type: 'schedule',
      text: '수업과 활동 일정이 한꺼번에 몰리면 전체 일정을 조정하기 어렵다.',
    },
    b: {
      type: 'archive',
      text: '참여한 활동의 과정과 성과를 나중에 설명할 수 있도록 남기기 어렵다.',
    },
  },
  {
    id: 6,
    a: {
      type: 'study',
      text: '과목별 진도와 취약한 부분을 파악하기 어려워 공부 순서를 정하기 어렵다.',
    },
    b: {
      type: 'collaboration',
      text: '팀원의 역할과 완료 여부가 정리되지 않아 협업 진행 상황을 알기 어렵다.',
    },
  },
  {
    id: 7,
    a: {
      type: 'organization',
      text: '강의 필기와 참고 자료가 분리되어 있어 관련 내용을 함께 보기 어렵다.',
    },
    b: {
      type: 'study',
      text: '이전에 공부한 내용을 언제 다시 복습해야 할지 정하기 어렵다.',
    },
  },
  {
    id: 8,
    a: {
      type: 'study',
      text: '시험까지 남은 기간에 맞춰 공부량을 나누기 어렵다.',
    },
    b: {
      type: 'habit',
      text: '세운 목표를 일상에서 반복할 수 있는 작은 행동으로 바꾸기 어렵다.',
    },
  },
  {
    id: 9,
    a: {
      type: 'archive',
      text: '대외활동이나 프로젝트에서 맡은 일과 성과가 체계적으로 남아 있지 않다.',
    },
    b: {
      type: 'study',
      text: '공부한 내용과 아직 공부하지 않은 내용을 구분해서 관리하기 어렵다.',
    },
  },
  {
    id: 10,
    a: {
      type: 'collaboration',
      text: '회의 결정 사항과 다음 할 일이 팀원들에게 명확하게 공유되지 않는다.',
    },
    b: {
      type: 'organization',
      text: '강의 노트와 자료가 쌓여도 과목별로 일관되게 정리되지 않는다.',
    },
  },
  {
    id: 11,
    a: {
      type: 'habit',
      text: '혼자 세운 목표를 꾸준히 실행하고 진행 상황을 확인하기 어렵다.',
    },
    b: {
      type: 'collaboration',
      text: '팀원들과 역할·마감·파일을 하나의 공간에서 공유하기 어렵다.',
    },
  },
  {
    id: 12,
    a: {
      type: 'collaboration',
      text: '팀 프로젝트를 진행하는 동안 서로의 업무 상태를 확인하기 어렵다.',
    },
    b: {
      type: 'archive',
      text: '프로젝트가 끝난 뒤 내가 기여한 내용과 배운 점을 정리하기 어렵다.',
    },
  },
  {
    id: 13,
    a: {
      type: 'organization',
      text: '필요한 자료를 저장해도 분류 기준이 일정하지 않아 다시 찾기 어렵다.',
    },
    b: {
      type: 'habit',
      text: '며칠 실천하지 못하면 계획 자체를 포기하게 되는 경우가 많다.',
    },
  },
  {
    id: 14,
    a: {
      type: 'archive',
      text: '지원서나 포트폴리오를 쓸 때 과거 활동 자료를 다시 모아야 한다.',
    },
    b: {
      type: 'organization',
      text: '시험이나 과제를 할 때 예전에 정리한 자료를 빠르게 찾기 어렵다.',
    },
  },
  {
    id: 15,
    a: {
      type: 'habit',
      text: '목표를 정해도 얼마나 지속하고 있는지 눈으로 확인하기 어렵다.',
    },
    b: {
      type: 'archive',
      text: '활동 중에는 바빠서 과정과 결과를 기록하지 못하고 넘어간다.',
    },
  },
]
