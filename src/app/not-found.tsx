export default function NotFound() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      <div className="max-w-lg mx-auto text-center">
        <div className="mb-8">
          <h1
            className="text-hero text-6xl md:text-7xl font-bold mb-4"
            style={{ color: "var(--text-accent)" }}
          >
            404
          </h1>
          <h2
            className="text-heading text-2xl md:text-3xl mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Page not found
          </h2>
          <p
            className="text-body text-sm mb-8 max-w-xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            The page you are looking for does not exist or has been moved.
          </p>
        </div>
      </div>
    </main>
  );
}
