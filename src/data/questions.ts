import type { Question } from '../types'

/**
 * 9개 비교 문항. 원래는 6개 유형의 모든 조합(15개, 유형별 5회)을 비교했지만,
 * 문항 수가 많다는 피드백에 따라 설계를 축소했다.
 *
 * 축소 방식: 6개 유형을 두 그룹으로 나눠
 *   그룹1(자기관리) = schedule·study·habit, 그룹2(정보·관계관리) = collaboration·organization·archive
 * ① 각 그룹 내부의 3개 조합은 모두 비교하고
 * ② 그룹 사이는 schedule↔collaboration, study↔organization, habit↔archive 짝으로만 비교해
 * 총 9개 조합(3+3+3)을 선택했다. 그 결과 6개 유형 모두 정확히 3회씩 등장하는
 * 균형은 그대로 유지된다(검증: tests/data-integrity.test.ts).
 * 문항 문구는 사용자 검토를 거쳐 확정한 간결한 버전을 그대로 쓴다.
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
      type: 'habit',
      text: '계획은 세우지만 매일 지켰는지 확인 안 해서 흐지부지된다.',
    },
    b: {
      type: 'schedule',
      text: '중요한 일정을 뒤늦게 알아채 매번 급하게 처리한다.',
    },
  },
  {
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
