"use client";

import { ChevronDown, Link, MapPin } from "lucide-react";

export function IconMapPin({ size = 10 }: { size?: number }) {
  return <MapPin size={size} aria-hidden="true" />;
}

export function IconChevron({
  size = 12,
  up = false,
}: {
  size?: number;
  up?: boolean;
}) {
  return (
    <ChevronDown
      size={size}
      aria-hidden="true"
      style={{
        transform: up ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.25s ease",
      }}
    />
  );
};

export function IconLink({ size = 10 }: { size?: number }) {
  return <Link size={size} aria-hidden="true" />;
}
