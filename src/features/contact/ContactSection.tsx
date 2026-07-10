"use client";

import { SocialLinks } from "@/components/shared/SocialLinks";
import { useInView } from "@/hooks/useInView";

export default function ContactSection() {
  const { ref, inView } = useInView();

  return (
    <section
      id="contact"
      className="px-4 py-16 md:py-24"
      style={{
        scrollMarginTop: "5rem",
        background: "var(--bg-secondary)",
      }}
      aria-label="Contact"
    >
      <div className="max-w-6xl mx-auto">
        {/* Terminal header */}
        <div
          ref={ref}
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(12px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          <div className="flex items-center gap-3 mb-2">
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
              curl ./contact
            </h2>
          </div>
          <p
            className="text-code text-sm ml-6 mb-10"
            style={{ color: "var(--text-muted)" }}
          >
            Get in touch — I&apos;d love to hear from you
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left: Contact info */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(16px)",
              transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
            }}
          >
            <div
              className="rounded-md p-6"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-accent)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              {/* Availability badge */}
              <div className="flex items-center gap-2 mb-6">
                <span
                  className="relative flex h-3 w-3"
                  aria-label="Available for opportunities"
                >
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ background: "var(--text-accent)" }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-3 w-3"
                    style={{ background: "var(--text-accent)" }}
                  />
                </span>
                <span
                  className="text-sm font-mono"
                  style={{ color: "var(--text-accent)" }}
                >
                  Open to opportunities
                </span>
              </div>

              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "var(--text-secondary)" }}
              >
                Whether you have a project idea, a job opportunity, or just want
                to connect — feel free to reach out. I typically respond within
                24 hours.
              </p>

              {/* Email CTA */}
              <a
                href="mailto:yusufrezahasnat0006@gmail.com"
                className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-md text-sm font-semibold transition-all duration-300"
                style={{
                  color: "var(--bg-primary)",
                  background: "var(--text-accent)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.9";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
                aria-label="Send email to Yusuf Reza Hasnat"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                Send an Email
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>

              {/* Social links */}
              <div
                className="mt-6 pt-6"
                style={{
                  borderTop: "1px solid var(--border-primary)",
                }}
              >
                <p
                  className="text-xs font-mono mb-3"
                  style={{ color: "var(--text-muted)" }}
                >
                  Or find me on:
                </p>
                <SocialLinks size={20} className="flex flex-wrap gap-4" />
              </div>
            </div>
          </div>

          {/* Right: Quick info cards */}
          <div
            className="space-y-4"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(16px)",
              transition: "opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s",
            }}
          >
            {/* Location */}
            <div
              className="flex items-center gap-3 rounded-md p-4"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-primary)",
              }}
            >
              <span
                className="shrink-0 flex items-center justify-center w-10 h-10 rounded-md"
                style={{ background: "var(--bg-badge)" }}
                aria-hidden="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: "var(--text-accent)" }}
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <div>
                <p
                  className="text-sm font-medium"
                  style={{ color: "var(--text-primary)" }}
                >
                  Location
                </p>
                <p
                  className="text-xs font-mono mt-0.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>

            {/* Response time */}
            <div
              className="flex items-center gap-3 rounded-md p-4"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-primary)",
              }}
            >
              <span
                className="shrink-0 flex items-center justify-center w-10 h-10 rounded-md"
                style={{ background: "var(--bg-badge)" }}
                aria-hidden="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: "var(--text-accent)" }}
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </span>
              <div>
                <p
                  className="text-sm font-medium"
                  style={{ color: "var(--text-primary)" }}
                >
                  Response Time
                </p>
                <p
                  className="text-xs font-mono mt-0.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  Usually within 24 hours
                </p>
              </div>
            </div>

            {/* Currently */}
            <div
              className="flex items-center gap-3 rounded-md p-4"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-primary)",
              }}
            >
              <span
                className="shrink-0 flex items-center justify-center w-10 h-10 rounded-md"
                style={{ background: "var(--bg-badge)" }}
                aria-hidden="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: "var(--text-accent)" }}
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </span>
              <div>
                <p
                  className="text-sm font-medium"
                  style={{ color: "var(--text-primary)" }}
                >
                  Currently
                </p>
                <p
                  className="text-xs font-mono mt-0.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  Software Engineer at Enosis Solutions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
