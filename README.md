# 노션 약방 – 학교생활 고민 유형검사

부산대학교 축제 부스용 모바일 웹사이트. Vite + React + TypeScript로 만든 완전한 정적 사이트이며,
백엔드·데이터베이스·회원가입 없이 동작한다. 자세한 요구사항과 설계 근거는 [SPEC.md](./SPEC.md)를 참고한다.

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

추천 템플릿 6개와 방명록 링크는 [src/data/links.ts](./src/data/links.ts) 한 파일에서만 관리한다.
현재는 실제 페이지가 아직 없어 모든 `url`이 `null`로 되어 있고, 그동안 해당 버튼은 자동으로
비활성화되며 "(준비 중)"이 표시된다.

실제 URL이 준비되면 **이 파일만 수정하면 된다**. 다른 파일은 건드릴 필요가 없다.

```ts
// src/data/links.ts
export const TEMPLATE_LINKS: Record<TypeId, LinkConfig> = {
  schedule: {
    key: 'schedule',
    label: '학사 일정·과제 마감 대시보드',
    url: null, // ← 예: 'https://www.notion.so/실제-템플릿-주소'
  },
  // ... study / collaboration / organization / habit / archive 동일한 방식
}

export const GUESTBOOK_LINK: LinkConfig = {
  key: 'guestbook',
  label: '방명록',
  url: null, // ← 실제 방명록 주소로 교체
}
```

- `url`에 실제 주소 문자열을 채워 넣으면 해당 버튼이 **코드 수정 없이 자동으로 활성화**된다
  (`src/logic/links.ts`의 `isLinkReady`가 `url` 값 하나만으로 활성화 여부를 판단한다).
- 6개 템플릿 중 일부만 먼저 준비됐다면 해당 유형만 채워 넣으면 되고, 나머지는 `null`로 둬도 된다.
- `url`은 실제 목적지 주소만 넣는다. `""`(빈 문자열)이나 `"#"` 같은 임시 값은 넣지 않는다 — 둘 다
  "준비 안 됨"으로는 처리되지만, 실수로 남겨두면 나중에 헷갈릴 수 있으니 `null`을 유지하는 것을 권장한다.
- 값을 채운 뒤에는 `npm run build`로 다시 빌드해서 배포하면 된다.

## 배포

`npm run build`의 결과물(`dist/`)을 그대로 정적 호스팅(GitHub Pages 등)에 올리면 된다.
GitHub 연동 및 실제 배포 절차는 아직 진행하지 않았다.
