"use client";

import GridBackground from "@/components/ui/GridBackground";
import Sparkles from "@/components/ui/Sparkles";
import TextGenerateEffect from "@/components/ui/TextGenerateEffect";
import Image from "next/image";
import { useEffect, useState } from "react";

const TITLES = [
  "Competitive Programmer",
  "Software Engineer @ Enosis Solutions",
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
    <GridBackground className="min-h-[80vh] flex items-center justify-center px-4 py-20">
      <section id="hero" className="max-w-5xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Profile image */}
          <div className="shrink-0 animate-fadeIn">
            <div
              className="relative w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden"
              style={{
                border: "3px solid var(--border-accent)",
                boxShadow: "var(--shadow-glow)",
              }}
            >
              <Image
                src="/hasnat.jpeg"
                alt="Yusuf Reza Hasnat"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 160px, 208px"
              />
            </div>
          </div>

          {/* Text content */}
          <div className="text-center md:text-left animate-fadeIn">
            <Sparkles particleCount={15} />
            <div
              className="font-mono text-sm mb-3"
              style={{ color: "var(--text-muted)" }}
            >
              <span style={{ color: "var(--text-accent)" }}>$</span> whoami
            </div>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 font-mono tracking-tight"
              style={{ color: "var(--text-accent)" }}
            >
              Yusuf Reza Hasnat
            </h1>

            {/* Typing animation subtitle */}
            <div
              className="font-mono text-lg md:text-xl mb-6 h-8"
              style={{ color: "var(--text-secondary)" }}
            >
              <span style={{ color: "var(--text-accent)" }}>→</span>{" "}
              <span>{displayTitle}</span>
              <span
                className="inline-block w-0.5 h-5 align-middle animate-pulse ml-0.5"
                style={{ background: "var(--text-accent)" }}
              />
            </div>

            {/* Bio */}
            <div
              className="text-sm max-w-xl mb-8"
              style={{ color: "var(--text-secondary)" }}
            >
              <TextGenerateEffect
                words="Building efficient projects, competing in ICPC and multiple IUPCs. Short bio will come here soon..."
                delay={30}
              />
            </div>

            {/* Social links */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
              <a
                href="https://linkedin.com/in/yusufrezahasnat"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--text-accent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-muted)")
                }
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="mailto:yusufrezahasnat0006@gmail.com"
                className="transition-all duration-300"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--text-accent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-muted)")
                }
                aria-label="Gmail"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.691 2.28 24 3.434 24 5.457z" />
                </svg>
              </a>
              <a
                href="https://github.com/hasnat0006"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--text-accent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-muted)")
                }
                aria-label="GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
              <a
                href="https://codeforces.com/profile/Hasnat0006"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--text-accent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-muted)")
                }
                aria-label="Codeforces"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3zm9-4.5c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V4.5c0-.828.672-1.5 1.5-1.5h3zm9 7.5c.828 0 1.5.672 1.5 1.5v7.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V12c0-.828.672-1.5 1.5-1.5h3z" />
                </svg>
              </a>
            </div>

            {/* Problem-solving stats badge */}
            {/* <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono"
                style={{
                  background: "var(--bg-badge)",
                  color: "var(--text-accent)",
                  border: "1px solid var(--border-accent)",
                }}
              >
                ◉ 1500+ problems solved
              </span>
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono"
                style={{
                  background: "var(--category-iupc-bg)",
                  color: "var(--category-iupc)",
                  border: "1px solid var(--category-iupc-border)",
                }}
              >
                🏅 Specialist at Codeforces
              </span>
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono"
                style={{
                  background: "var(--category-icpc-bg)",
                  color: "var(--category-icpc)",
                  border: "1px solid var(--category-icpc-border)",
                }}
              >
                🌍 ICPC Regionalist
              </span>
            </div> */}

            {/* Navigation links */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              {[
                {
                  label: "projects",
                  href: "#projects",
                  icon: "M2 6a2 2 0 012-2h5l2 2h9a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6z",
                },
                {
                  label: "achievements",
                  href: "#achievements",
                  icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
                },
                {
                  label: "github",
                  href: "#github",
                  icon: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
                },
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  className="group flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300"
                  style={{
                    color: "var(--text-accent)",
                    border: "1px solid var(--border-accent)",
                    background: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--bg-badge)";
                    e.currentTarget.style.borderColor = "var(--border-hover)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "var(--border-accent)";
                  }}
                  aria-label={label}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d={icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </GridBackground>
  );
}
