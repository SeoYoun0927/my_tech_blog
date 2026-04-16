export const siteConfig = {
  name: "박서윤 테크 블로그",
  title: "Calm Notes on Game Development and Implementation",
  description:
    "게임 개발과 구현 과정에서 배우고 고민한 것들을 차분하게 기록하는 개인 기술 블로그입니다.",
  url: "https://my-tech-blog.vercel.app",
  author: {
    name: "박서윤",
    role: "Aspiring Game Programmer",
    intro: "게임을 만들며 배우고 구현한 것들을 꾸준히 기록합니다.",
    bio: "게임 프로그래밍, 클라이언트 구현, 인터랙션과 UI, 그리고 개발 과정에서 마주한 시행착오와 해결을 차분히 정리합니다.",
    email: "hello@mytechblog.dev",
    location: "Seoul, South Korea",
  },
  links: {
    github: "https://github.com/example",
    email: "mailto:hello@mytechblog.dev",
    blog: "https://my-tech-blog.vercel.app",
  },
  nav: [
    { href: "/", label: "Home" },
    { href: "/categories", label: "Categories" },
    { href: "/tags", label: "Tags" },
    { href: "/archives", label: "Archives" },
    { href: "/about", label: "About" },
  ],
  footerLinks: [
    { href: "/posts", label: "Posts" },
    { href: "/projects", label: "Projects" },
  ],
  interests: ["Frontend Architecture", "Game UI", "Developer Experience", "Design Systems"],
} as const;
