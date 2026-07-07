"use client";

import { TABLE_HEADERS, TABLE_HEADER_WIDTHS } from "@/constants/achievements";

/**
 * Table header row for the ICPC / IUPC achievements table.
 */
export function TableHeader() {
  return (
    <thead>
      <tr
        style={{
          borderBottom: "1px solid rgba(52,211,153,0.1)",
          background: "rgba(52,211,153,0.04)",
        }}
      >
        {TABLE_HEADERS.map((header, index) => (
          <th
            key={index}
            className={`py-3 text-left ${TABLE_HEADER_WIDTHS[index]}`}
          >
            <span
              className="text-[10px] font-mono uppercase tracking-widest font-semibold"
              style={{ color: "var(--text-muted)" }}
            >
              {header}
            </span>
          </th>
        ))}
      </tr>
    </thead>
  );
}
