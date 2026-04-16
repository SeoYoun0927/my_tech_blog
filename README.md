# my-tech-blog

`Next.js + Tailwind CSS + MDX` 기반의 개인 기술 블로그입니다.

## 실행 방법

```bash
npm run dev
```

프로덕션 빌드 확인:

```bash
npm run build
npm run start
```

## 글 추가 방법

새 글은 `content/posts` 폴더에 `.mdx` 파일로 추가합니다.

예시:

- `content/posts/my-new-post.mdx`

자세한 작성 규칙은 `docs/writing-guide.md`를 참고합니다.

## 프로젝트 추가 방법

프로젝트 카드는 `data/projects.ts`에 새 객체를 추가하면 됩니다.

## 배포 방법

1. GitHub에 저장소를 푸시합니다.
2. Vercel에서 저장소를 Import 합니다.
3. Framework Preset은 `Next.js`를 사용합니다.
4. 기본 설정 그대로 배포합니다.
