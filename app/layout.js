export const metadata = { title: "Sundae", robots: { index: false } };
export default function RootLayout({ children }) {
  return (<html lang="en"><body style={{ margin: 0, minHeight: "100vh", display: "grid", placeItems: "center", background: "#0f0b0c", color: "#f5ece6", fontFamily: "system-ui, sans-serif" }}>{children}</body></html>);
}
