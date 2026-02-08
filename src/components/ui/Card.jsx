export default function Card({ children, className }) {
  return (
    <div
      className={`p-4 rounded shadow transition-colors ${className || ""}`}
      style={{
        backgroundColor: "var(--card-bg)",
        color: "var(--card-text)",
      }}
    >
      {children}
    </div>
  );
}
