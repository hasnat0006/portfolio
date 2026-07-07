import { SocialLinks } from "@/components/shared/SocialLinks";

/**
 * Site footer with social links and copyright.
 */
export function Footer() {
  return (
    <footer
      className="px-4 py-10"
      style={{ borderTop: "1px solid var(--border-primary)" }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <SocialLinks
          size={20}
          className="flex flex-wrap justify-center gap-5 mb-5"
        />
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          &copy; {new Date().getFullYear()} Yusuf Reza Hasnat. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
