import { ImageResponse } from "next/og";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export default function AppleIcon() {
  return new ImageResponse(
    <div style={{ width: 180, height: 180, display: "flex", alignItems: "center", justifyContent: "center", background: "#0f172a", borderRadius: 36 }}>
      <svg width="120" height="120" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="56" height="56" rx="12" fill="#0f172a"/>
        <rect x="2" y="2" width="56" height="56" rx="12" stroke="#14b8a6" strokeWidth="2"/>
        <path d="M30 10C30 10 22 20 22 27c0 4.418 3.582 8 8 8s8-3.582 8-8c0-7-8-17-8-17z" fill="#14b8a6"/>
        <path d="M30 14c0 7-6 14-6 14s6-2 6-8 6 8 6 8-6-7-6-14z" fill="#fff" opacity="0.9"/>
        <path d="M30 23l3 4h-6l3-4z" fill="#14b8a6"/>
        <text x="30" y="46" textAnchor="middle" fontFamily="Georgia, serif" fontSize="10" fontWeight="700" fill="#fff" letterSpacing="1">BIOLIFE</text>
      </svg>
    </div>,
    { ...size },
  );
}
