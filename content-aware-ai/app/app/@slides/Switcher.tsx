"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const Switcher = () => {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    if (!params.has("state")) {
      const newParams = new URLSearchParams(params);
      newParams.set("state", "0");
      router.push(`?${newParams.toString()}`);
    }
  }, []);

  const toState = (d: number) => {
    const state = parseInt(params.get("state") || "0");
    const next = state + d;
    if (next < 0 || next > 5) {
      return;
    }
    const newParams = new URLSearchParams(params);
    newParams.set("state", String(next));
    router.push(`?${newParams.toString()}`);
  };

  return (
    <div className="absolute top-4 right-4 flex items-center gap-1">
      <Button variant="ghost" size="sm" onClick={() => toState(-1)}>
        prev
      </Button>
      <Button variant="ghost" size="sm" onClick={() => toState(1)}>
        next
      </Button>
    </div>
  );
};
