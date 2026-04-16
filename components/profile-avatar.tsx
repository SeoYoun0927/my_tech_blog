import Image from "next/image";

export function ProfileAvatar() {
  return (
    <div className="relative h-18 w-18 overflow-hidden rounded-[22px] border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-soft)]">
      <Image src="/profile.jpg" alt="Cat profile avatar" fill className="object-cover" sizes="72px" priority />
    </div>
  );
}
