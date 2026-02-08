export default function Home() {
  return (
    <div
      className="p-4 rounded shadow transition-colors"
      style={{
        backgroundColor: "var(--card-bg)",
        color: "var(--card-text)",
      }}
    >
      <h2 className="text-xl font-bold mb-2">Home Page</h2>
      <p>Toggle the theme using the button in header.</p>
    </div>
  );
}
