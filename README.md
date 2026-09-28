# 노션 약방 – 학교생활 고민 유형검사

부산대학교 축제 부스용 모바일 웹사이트. Vite + React + TypeScript로 만든 완전한 정적 사이트이며,
백엔드·데이터베이스·회원가입 없이 동작한다. 자세한 요구사항과 설계 근거는 [SPEC.md](./SPEC.md)를 참고한다.

**배포 주소**: https://myeunkr.github.io/Notion_Booksamje/ (main 브랜치에 push하면 GitHub Actions가 자동으로 재배포한다)

## 개발

```bash
npm install
npm run dev        # 개발 서버
npm run typecheck  # TypeScript strict 검사
npm run lint       # ESLint
npm run test       # Vitest (점수/동점 로직 + 데이터 무결성 + localStorage)
npm run build      # 프로덕션 빌드 (dist/)
npm run preview    # 빌드 결과 미리보기
```

## 템플릿·방명록 URL 교체 방법

추천 템플릿 4개(schedule/collaboration/organization/habit)와 방명록 링크는
[src/data/links.ts](./src/data/links.ts) 한 파일에서만 관리한다. 지금은 모두 실제 Notion
페이지 URL이 채워져 있어 버튼이 정상적으로 열린다.

나중에 URL이 바뀌면 **이 파일만 수정하면 된다**. 다른 파일은 건드릴 필요가 없다.

```ts
// src/data/links.ts
export const TEMPLATE_LINKS: Record<TypeId, LinkConfig> = {
  schedule: {
    key: 'schedule',
    label: '학사 일정·과제 마감 대시보드',
    url: 'https://app.notion.com/p/...', // ← 여기만 바꾸면 된다
  },
  // ... collaboration / organization / habit 동일한 방식
}

export const GUESTBOOK_LINK: LinkConfig = {
  key: 'guestbook',
  label: '방명록',
  url: 'https://campusleaders.notion.site/...',
}
```

- `url`에 값이 있으면 버튼이 활성화되고, `null`이거나 빈 문자열이면 자동으로 비활성화되며
  "(준비 중)"이 표시된다(`src/logic/links.ts`의 `isLinkReady`가 판단).
- 아직 준비되지 않은 템플릿이 생기면 해당 유형만 `url: null`로 되돌리면 된다.
- `url`은 실제 목적지 주소만 넣는다. `""`(빈 문자열)이나 `"#"` 같은 임시 값은 넣지 않는다.
- 값을 바꾼 뒤에는 커밋해서 main에 push하면 GitHub Actions가 알아서 다시 빌드·배포한다.

## 유형 구성

원래는 6개 유형(schedule/study/collaboration/organization/habit/archive)이었으나, 실제
준비된 노션 템플릿이 4개였기 때문에 study는 schedule("일정 및 계획 관리")에 통합하고
archive는 삭제해 **4개 유형**(schedule/collaboration/organization/habit)으로 재구성했다.
문항도 이에 맞춰 4개 유형의 모든 조합(6개)을 비교하는 6문항으로 조정했다. 자세한 내용은
[SPEC.md](./SPEC.md) §1을 참고한다.

## 배포

main 브랜치에 push하면 [.github/workflows/deploy.yml](./.github/workflows/deploy.yml)이
자동으로 typecheck → lint → test → build → GitHub Pages 배포를 수행한다. 수동으로 빌드
결과물만 확인하고 싶다면 `npm run build` 후 `dist/`를 열어보면 된다.
