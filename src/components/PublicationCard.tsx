type PublicationCardProps = {
  title: string;
  description: string;
  doi?: string;
  indexedIn?: string;
  domain?: string;
};

export default function PublicationCard({
  title,
  description,
  doi,
  indexedIn = "PubMed",
  domain = "Biomedical / Computational Data Pipelines",
}: PublicationCardProps) {
  return (
    <article
      className="group relative rounded-md border p-6 transition-all duration-300"
      style={{
        borderColor: "var(--border-accent)",
        background: "var(--bg-card)",
      }}
    >
      {/* Index Badge */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className="inline-flex items-center px-2.5 py-1 rounded-md text-meta font-semibold border"
          style={{
            background: "var(--bg-badge)",
            color: "var(--text-accent)",
            borderColor: "var(--border-accent)",
          }}
        >
          <svg
            className="w-3 h-3 mr-1.5"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          {indexedIn}
        </span>
        <span className="text-meta" style={{ color: "var(--text-muted)" }}>
          peer-reviewed
        </span>
      </div>

      {/* Title */}
      <h3
        className="text-subheading text-lg mb-2 transition-colors"
        style={{ color: "var(--text-accent-secondary)" }}
      >
        {title}
      </h3>

      {/* Domain */}
      <div className="text-meta mb-3">
        <span style={{ color: "var(--text-muted)" }}>domain:</span>{" "}
        <span style={{ color: "var(--text-accent)" }}>{domain}</span>
      </div>

      {/* Description */}
      <p
        className="text-sm leading-relaxed mb-4"
        style={{ color: "var(--text-secondary)" }}
      >
        {description}
      </p>

      {/* DOI Link */}
      {doi && (
        <a
          href={`https://doi.org/${doi}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-small text-xs transition-colors px-3 py-1.5 rounded-md border"
          style={{
            color: "var(--text-accent)",
            borderColor: "var(--border-accent)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--bg-badge)";
            e.currentTarget.style.borderColor = "var(--border-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "var(--border-accent)";
          }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
          DOI: {doi}
        </a>
      )}
    </article>
  );
}
