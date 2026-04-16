"use client";

import Image from "next/image";
import { useState } from "react";

import { homeBanner } from "@/data/banner";

export function HeroBanner() {
  const [src, setSrc] = useState<string>(homeBanner.primarySrc);
  const [usingFallback, setUsingFallback] = useState(false);

  return (
    <section className="space-y-4">
      <div className="relative overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-soft)]">
        <Image
          src={src}
          alt={homeBanner.alt}
          width={1600}
          height={900}
          unoptimized
          priority
          className="block h-[240px] w-full object-cover sm:h-[300px] lg:h-[340px]"
          onError={() => {
            if (!usingFallback) {
              setSrc(homeBanner.fallbackSrc);
              setUsingFallback(true);
            }
          }}
        />
      </div>
      <p className="px-1 text-sm leading-7 text-[var(--muted-foreground)]">
        {homeBanner.caption}
      </p>
    </section>
  );
}
