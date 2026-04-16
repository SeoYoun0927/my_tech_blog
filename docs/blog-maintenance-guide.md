# 블로그 수정/관리 가이드

이 문서는 블로그 구조나 내용을 수정할 때 어디를 고쳐야 하는지 쉽게 정리한 문서입니다.

## 1. 프로필 정보 수정 방법

- 파일: `data/site.ts`
- 수정 항목: 이름, 한 줄 소개, 상세 소개, 이메일, GitHub 링크, 위치

## 2. 사이드바 메뉴 수정 방법

- 파일: `data/site.ts`
- 수정 위치: `siteConfig.nav`

사이드바 UI 자체를 바꾸고 싶다면 다음 파일을 수정합니다.

- `components/site-shell.tsx`
- `components/sidebar-nav.tsx`

## 3. 홈 화면 구성 수정 방법

- 파일: `app/page.tsx`

홈 화면 구성 순서:

1. 미니게임
2. 썸네일 카드 3개
3. 최근 글 목록
4. 오른쪽 탐색 사이드바

관련 파일:

- `components/mini-game-hero.tsx`
- `components/mini-post-grid.tsx`
- `components/home-right-rail.tsx`

## 4. 최근 글 / 태그 / 프로젝트 수정 방법

- 최근 글과 태그 집계 로직: `lib/posts.ts`
- 프로젝트 데이터: `data/projects.ts`

## 5. 색상 및 스타일 수정 위치

- 파일: `app/globals.css`

주요 변수:

- `--background`
- `--foreground`
- `--accent`
- `--accent-strong`
- `--accent-soft`

## 6. 새 프로젝트 카드 추가 방법

- 파일: `data/projects.ts`

필수 필드:

- `slug`
- `name`
- `summary`
- `description`
- `icon`
- `href`
- `stack`
- `highlight`

## 7. 로컬 실행 방법

```bash
npm run dev
```

## 8. 배포 방법

1. GitHub에 코드를 푸시합니다.
2. Vercel에서 저장소를 가져옵니다.
3. Framework Preset은 `Next.js`를 사용합니다.
4. 기본 설정으로 배포합니다.

## 9. 수정 후 확인 방법

```bash
npm run lint
npm run build
```

확인할 것:

- 사이드바 메뉴가 잘 보이는지
- 홈 3단 구조가 유지되는지
- 검색/태그/아카이브 링크가 잘 동작하는지
- 모바일에서도 무너지지 않는지

## 10. 실제 수정 경로 빠르게 보기

- 프로필/메뉴: `data/site.ts`
- 홈 구성: `app/page.tsx`
- 홈 미니게임: `components/mini-game-hero.tsx`
- 홈 오른쪽 탐색: `components/home-right-rail.tsx`
- 글 로딩 로직: `lib/posts.ts`
- 프로젝트 데이터: `data/projects.ts`
- 전역 스타일: `app/globals.css`
