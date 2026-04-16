export function ProfileAvatar() {
  return (
    <div className="relative h-18 w-18 overflow-hidden rounded-[22px] border border-[var(--border)] bg-[var(--avatar-bg)] shadow-[var(--shadow-soft)]">
      <div className="absolute left-4 top-4 h-2.5 w-2.5 bg-[var(--avatar-ink)] shadow-[18px_0_0_var(--avatar-ink)]" />
      <div className="absolute left-5 top-9 h-2 w-8 bg-[var(--avatar-ink)]" />
      <div className="absolute left-2 top-2 h-4 w-4 bg-[var(--accent-soft)]" />
      <div className="absolute right-2 top-2 h-4 w-4 bg-[var(--accent-soft)]" />
      <div className="absolute bottom-0 left-0 right-0 h-5 bg-[var(--accent)] opacity-55" />
    </div>
  );
}
