import LogoIcon from "./LogoIcon";
export default function LogoHorizontal({ iconSize = 28 }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
      <LogoIcon size={iconSize} />
      <span style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif", fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.3px" }}>
        Bio<span style={{ color: "#14b8a6" }}>Life</span>
      </span>
    </span>
  );
}
