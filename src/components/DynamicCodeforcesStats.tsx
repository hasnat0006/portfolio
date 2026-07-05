"use client";

import dynamic from "next/dynamic";

const CodeforcesStats = dynamic(() => import("@/components/CodeforcesStats"), {
  ssr: false,
});

export default function DynamicCodeforcesStats() {
  return <CodeforcesStats />;
}
