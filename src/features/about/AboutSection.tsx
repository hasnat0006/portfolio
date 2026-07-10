"use client";

import { useCounter } from "@/hooks/useCounter";
import { useInView } from "@/hooks/useInView";
import Image from "next/image";

function StatItem({
  value,
  label,
  suffix,
}: {
  value: number;
  label: string;
  suffix?: string;
}) {
  const { ref, inView } = useInView();
  const count = useCounter(value, 1500, inView);

  return (
    <div ref={ref} className="text-center">
      <p
        className="text-2xl md:text-3xl font-bold font-mono"
        style={{ color: "var(--text-accent)" }}
      >
        {count}
        {suffix ?? "+"}
      </p>
      <p
        className="text-xs mt-1 font-mono"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </p>
    </div>
  );
}

export default function AboutSection() {
  const { ref, inView } = useInView();

  return (
    <section
      id="about"
      className="px-4 py-16 md:py-24"
      style={{ scrollMarginTop: "5rem", background: "var(--bg-secondary)" }}
      aria-label="About me"
    >
      <div className="max-w-6xl mx-auto">
        {/* Terminal header */}
        <div
          className="flex items-center gap-3 mb-2"
          ref={ref}
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(12px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          <span
            className="text-code text-sm"
            style={{ color: "var(--text-accent)" }}
          >
            $
          </span>
          <h2
            className="text-heading text-2xl md:text-3xl"
            style={{ color: "var(--text-primary)" }}
          >
            cat ./about
          </h2>
        </div>
        <p
          className="text-code text-sm ml-6 mb-10"
          style={{
            color: "var(--text-muted)",
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(12px)",
            transition: "opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s",
          }}
        >
          Software engineer, problem solver &amp; lifelong learner
        </p>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          {/* Profile photo */}
          <div
            className="shrink-0 mx-auto md:mx-0"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(16px)",
              transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
            }}
          >
            <div
              className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden"
              style={{
                border: "2px solid var(--border-accent)",
                boxShadow: "var(--shadow-glow)",
              }}
            >
              <Image
                src="/hasnat.jpeg"
                alt="Yusuf Reza Hasnat"
                fill
                className="object-cover rounded-full"
                sizes="(max-width: 768px) 128px, 160px"
              />
            </div>
          </div>

          {/* Bio content */}
          <div
            className="flex-1 min-w-0"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(16px)",
              transition: "opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s",
            }}
          >
            <div
              className="text-sm md:text-base leading-relaxed space-y-4"
              style={{ color: "var(--text-secondary)" }}
            >
              <p>
                I am a{" "}
                <strong style={{ color: "var(--text-primary)" }}>
                  Software Engineer
                </strong>{" "}
                at{" "}
                <strong style={{ color: "var(--text-primary)" }}>
                  Enosis Solutions
                </strong>{" "}
                and a Computer Science &amp; Engineering graduate from the{" "}
                <strong style={{ color: "var(--text-primary)" }}>
                  Military Institute of Science and Technology (MIST)
                </strong>
                . My work spans full-stack web development, competitive
                programming, and building tools that make a tangible impact.
              </p>
              <p>
                As a{" "}
                <strong style={{ color: "var(--text-primary)" }}>
                  Specialist
                </strong>{" "}
                on Codeforces and an ICPC Asia Dhaka Regionalist, I have solved
                over 1500+ algorithmic problems across various online judges. I
                am passionate about clean architecture, performant systems, and
                writing code that scales.
              </p>
              <p>
                Beyond engineering, I lead and mentor at the{" "}
                <strong style={{ color: "var(--text-primary)" }}>
                  MIST Computer Club
                </strong>
                , organizing programming contests and guiding junior members —
                because the best code is the one that helps others grow too.
              </p>
            </div>

            {/* Stats row */}
            <div
              className="grid grid-cols-3 gap-6 mt-8 pt-8"
              style={{
                borderTop: "1px solid var(--border-primary)",
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(16px)",
                transition: "opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s",
              }}
            >
              <StatItem value={1500} label="Problems Solved" />
              <StatItem value={7} label="Projects Built" />
              <StatItem value={3} label="Years Coding" suffix="+" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
