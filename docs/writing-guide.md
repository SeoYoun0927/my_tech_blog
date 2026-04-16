# 글쓰기 가이드

이 문서는 이 블로그에 새 글을 추가할 때 따라야 할 기본 규칙을 정리한 문서입니다. 처음 글을 쓰는 사람도 그대로 따라 하면 됩니다.

## 1. 새 글 작성 방법

1. `content/posts` 폴더 안에 새 `.mdx` 파일을 만듭니다.
2. 파일 맨 위에 frontmatter를 작성합니다.
3. 그 아래에 본문을 Markdown 또는 MDX로 작성합니다.
4. 저장 후 로컬 서버에서 화면을 확인합니다.

예시 경로:

- `C:\Users\mp092\OneDrive\바탕 화면\my-tech-blog\content\posts\my-first-post.mdx`

## 2. 글 파일 생성 위치와 파일명 규칙

- 위치: `content/posts`
- 권장 파일명: 영어 소문자와 하이픈 사용
- 예시: `nextjs-routing-note.mdx`, `design-system-retrospective.mdx`

## 3. 기본 frontmatter 구조

```mdx
---
title: "글 제목"
description: "목록에서 보일 짧은 설명"
date: "2026-04-16"
tags:
  - Next.js
  - Frontend
category: "Engineering"
featured: true
---
```

## 4. 제목 작성 팁

- 한 문장 안에서 글의 핵심이 보이게 씁니다.
- 너무 추상적인 제목보다 읽고 얻을 내용을 드러내는 제목이 좋습니다.

좋은 예:

- `Next.js App Router에서 글 목록 구조를 정리한 방법`
- `작은 팀에서 디자인 시스템을 가볍게 운영하는 법`

## 5. 태그 작성 규칙

- 글마다 2개에서 4개 정도를 권장합니다.
- 너무 넓은 태그보다 실제 탐색에 도움이 되는 태그가 좋습니다.
- 대소문자와 표기는 일관되게 유지합니다.

## 6. 글 기본 구조 추천

1. 문제 또는 주제 소개
2. 왜 이 내용을 정리하는지
3. 적용한 방식
4. 배운 점 또는 결론

## 7. 글 템플릿 예시

- 기술 글 템플릿: `content/posts/post-template-tech.md`
- 프로젝트 소개 템플릿: `content/posts/post-template-project.md`
- 회고 글 템플릿: `content/posts/post-template-retrospective.md`

## 8. 대표 이미지 넣는 방법

대표 이미지는 `public` 폴더에 넣고 본문에서 경로를 사용합니다.

예시:

- 이미지 파일 위치: `public/images/my-post-cover.png`

```md
![대표 이미지](/images/my-post-cover.png)
```

## 9. 가독성 좋게 문단 나누는 방법

- 한 문단은 2문장부터 4문장 정도로 유지합니다.
- 긴 목록은 bullet을 사용합니다.
- 소제목을 적극적으로 써서 흐름을 나눕니다.
- 코드 블록은 설명 문장 뒤에 배치합니다.

## 10. 이 블로그 톤에 맞는 글쓰기 방식

- 짧고 명확한 문장
- 핵심 먼저, 설명은 뒤에
- 과한 광고 문구 대신 맥락과 이유 중심
- 초보자도 이해할 수 있게 배경을 함께 설명
