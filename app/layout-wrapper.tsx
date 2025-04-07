"use client";

import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/toaster";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="relative min-h-screen w-full">
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(circle_at_center,white,transparent_80%)]",
            "absolute inset-0 -z-10 h-full w-full"
          )}
        />
        <main className="relative z-10">{children}</main>
      </div>
      <Toaster />
      <Analytics />
    </>
  );
}
