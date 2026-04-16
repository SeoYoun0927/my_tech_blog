export type Project = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  icon: string;
  href: string;
  stack: string[];
  highlight: string;
};

export const projects: Project[] = [
  {
    slug: "design-log",
    name: "Design Log",
    summary: "문서와 회고를 함께 관리하는 제품 개발 로그 앱",
    description:
      "인터뷰 메모, 설계 기록, 회고를 한 흐름으로 이어서 관리하는 내부 도구입니다. 긴 기록도 빠르게 훑을 수 있는 정보 구조를 만드는 데 집중했습니다.",
    icon: "DL",
    href: "https://github.com/example/design-log",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "MDX"],
    highlight: "제품 개발 문서 흐름을 가볍고 읽기 쉬운 구조로 정리",
  },
  {
    slug: "deploy-watch",
    name: "Deploy Watch",
    summary: "배포 상태와 오류 징후를 확인하는 경량 대시보드",
    description:
      "배포 기록과 체크리스트를 작은 팀이 빠르게 공유할 수 있도록 만든 대시보드입니다. 과한 기능보다 핵심 상태를 빠르게 읽는 경험에 초점을 맞췄습니다.",
    icon: "DW",
    href: "https://github.com/example/deploy-watch",
    stack: ["Next.js", "React", "Vercel", "Charts"],
    highlight: "배포 이후 꼭 봐야 할 상태를 차분한 카드 흐름으로 구성",
  },
];
