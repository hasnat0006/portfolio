"use client";

import { SocialLinks } from "@/components/shared/SocialLinks";
import GridBackground from "@/components/ui/GridBackground";
import ScrollDownIndicator from "@/components/ui/ScrollDownIndicator";
import Sparkles from "@/components/ui/Sparkles";
import TextGenerateEffect from "@/components/ui/TextGenerateEffect";
import Image from "next/image";
import { useEffect, useState } from "react";

const TITLES = [
  "Competitive Programmer",
  "Software Engineer L1 @ Enosis Solutions",
  "CSE undergraduate at MIST",
];

export default function HeroSection() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = TITLES[titleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentTitle.length) {
          setCharIndex((prev) => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (charIndex > 0) {
          setCharIndex((prev) => prev - 1);
        } else {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % TITLES.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, titleIndex]);

  const displayTitle = TITLES[titleIndex].substring(0, charIndex);

  return (
    <div className="relative">
      <GridBackground className="min-h-[80vh] flex items-center justify-center px-4 py-20">
        <section
          id="hero"
          className="max-w-6xl mx-auto w-full"
          style={{ scrollMarginTop: "5rem" }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Profile image */}
            <div className="shrink-0 animate-fadeIn transition-all duration-500 hover:scale-[1.04]">
              <div
                className="relative w-40 h-40 md:w-64 md:h-64 rounded-full overflow-hidden"
                style={{
                  border: "3px solid var(--border-accent)",
                  boxShadow: "var(--shadow-glow)",
                }}
              >
                <Image
                  src="/hasnat.jpeg"
                  alt="Yusuf Reza Hasnat"
                  fill
                  className="object-cover rounded-full"
                  priority
                  sizes="(max-width: 768px) 160px, 208px"
                />
              </div>
            </div>

            {/* Text content */}
            <div className="text-center md:text-left animate-fadeIn">
              <Sparkles particleCount={5} />

              <h1
                className="text-hero text-4xl sm:text-5xl md:text-6xl mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Yusuf Reza Hasnat
              </h1>

              {/* Typing animation subtitle */}
              <div
                className="text-body text-lg md:text-xl mb-6 -mt-2 h-8"
                style={{ color: "var(--text-secondary)" }}
              >
                <span style={{ color: "var(--text-accent)" }}>→</span>{" "}
                <span style={{ color: "var(--text-accent)" }}>
                  {displayTitle}
                </span>
                <span
                  className="inline-block w-0.5 h-5 align-middle animate-pulse ml-0.5"
                  style={{ background: "var(--text-accent)" }}
                />
              </div>

              {/* Bio */}
              <div
                className="text-sm max-w-xl mb-8 -mt-2"
                style={{ color: "var(--text-secondary)" }}
              >
                <TextGenerateEffect
                  words="Computer Science undergraduate and competitive programmer focused on software engineering, AI and modern web technologies. Passionate about building clean, scalable, and impactful digital solutions."
                  delay={30}
                />
              </div>

              {/* Social links — shared component */}
              <SocialLinks
                size={22}
                className="flex flex-wrap justify-center md:justify-start gap-4 mb-6"
              />

              {/* CV button */}
              <div className="flex flex-wrap justify-center md:justify-start">
                <a
                  href="/yusuf_reza_hasnat_cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-md text-sm font-semibold overflow-hidden transition-all duration-500"
                  style={{
                    color: "var(--text-accent)",
                    background: "var(--bg-card)",
                  }}
                  onMouseEnter={(e) => {
                    const btn = e.currentTarget;
                    btn.style.borderColor = "transparent";
                    btn.style.boxShadow =
                      "0 0 30px rgba(5, 150, 105, 0.15), 0 0 60px rgba(5, 150, 105, 0.05)";
                    btn.style.transform = "translateY(-2px)";
                    btn.style.background = "var(--bg-card-hover)";
                  }}
                  onMouseLeave={(e) => {
                    const btn = e.currentTarget;
                    btn.style.borderColor = "transparent";
                    btn.style.boxShadow = "none";
                    btn.style.transform = "translateY(0)";
                    btn.style.background = "var(--bg-card)";
                  }}
                  aria-label="View CV"
                >
                  {/* Animated gradient border */}
                  <span
                    className="absolute inset-0 rounded-md pointer-events-none"
                    style={{
                      padding: "1px",
                      background:
                        "conic-gradient(from 0deg, transparent, var(--text-accent), transparent 30%, transparent 60%, var(--text-accent-secondary), transparent 80%)",
                      WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                      animation: "rotateBorder 3s linear infinite",
                      opacity: 0.6,
                      transition: "opacity 0.4s ease",
                    }}
                  />
                  {/* Glow dot */}
                  <span
                    className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-md animate-ping"
                    style={{
                      background: "var(--text-accent)",
                      opacity: 0.4,
                    }}
                  />
                  {/* File icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="relative z-10 transition-transform duration-500 group-hover:scale-110"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                  {/* Text */}
                  <span className="relative z-10">View My CV</span>
                  {/* External link arrow */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="relative z-10 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </GridBackground>

      {/* Scroll-down indicator */}
      <ScrollDownIndicator />
    </div>
  );
}
