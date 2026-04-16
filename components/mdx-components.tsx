import Link from "next/link";

export const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="mt-10 text-3xl font-semibold tracking-tight" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mt-10 text-2xl font-semibold tracking-tight" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-8 text-xl font-semibold tracking-tight" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mt-5 text-base leading-8 text-[var(--post-foreground)]" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const href = props.href ?? "#";
    const isInternal = href.startsWith("/");

    if (isInternal) {
      return (
        <Link
          href={href}
          className="font-medium text-[var(--accent-strong)] underline decoration-[var(--accent)] underline-offset-4"
        >
          {props.children}
        </Link>
      );
    }

    return (
      <a
        {...props}
        className="font-medium text-[var(--accent-strong)] underline decoration-[var(--accent)] underline-offset-4"
        target="_blank"
        rel="noreferrer"
      />
    );
  },
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mt-5 list-disc space-y-2 pl-6 text-base leading-8 text-[var(--post-foreground)]" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mt-5 list-decimal space-y-2 pl-6 text-base leading-8 text-[var(--post-foreground)]" {...props} />
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => <li className="pl-1" {...props} />,
  blockquote: (props: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--accent-soft)] px-5 py-4 text-base leading-8 text-[var(--foreground)]"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="rounded-md bg-[var(--inline-code-bg)] px-1.5 py-1 font-mono text-[0.92em] text-[var(--inline-code-fg)]"
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="mt-6 overflow-x-auto rounded-3xl border border-[var(--code-border)] bg-[var(--code-bg)] p-5 text-sm leading-7 text-[var(--code-foreground)] shadow-[var(--shadow-soft)]"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-none border-t border-[var(--border)]" />,
};
