import Link from "next/link";

export default function NotFound() {
  return (
    <div className="soft-card px-7 py-12 text-center sm:px-9">
      <p className="section-eyebrow">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">페이지를 찾을 수 없습니다</h1>
      <p className="mt-4 text-sm leading-7 text-[var(--muted-foreground)]">
        주소가 변경되었거나 아직 작성되지 않은 페이지일 수 있습니다.
      </p>
      <div className="mt-8">
        <Link href="/" className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm font-medium hover:border-[var(--accent-strong)] hover:text-[var(--accent-strong)]">
          홈으로 이동
        </Link>
      </div>
    </div>
  );
}
