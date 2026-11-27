import { ImageResponse } from "next/og";
import { metrics, person } from "@/data/profile";

export const dynamic = "force-static";
const size = { width: 1200, height: 630 };

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#08090a",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          color: "#f7f8f8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, color: "#8a8f98", letterSpacing: 2 }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, background: "#f2b44c" }} />
          {person.fullName.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 600, letterSpacing: -2.5, lineHeight: 1.05 }}>{person.headline}</div>
          <div style={{ marginTop: 18, fontSize: 34, color: "#c9ced6" }}>{person.headlineSub}</div>
        </div>
        <div style={{ display: "flex", borderTop: "1px solid #23252a", paddingTop: 28 }}>
          {metrics.map((m, i) => (
            <div
              key={m.label}
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                paddingLeft: i === 0 ? 0 : 28,
                borderLeft: i === 0 ? "none" : "1px solid #23252a",
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span style={{ fontSize: 44, fontWeight: 600, color: i === 1 ? "#f2b44c" : "#f7f8f8" }}>{m.value}</span>
                <span style={{ fontSize: 20, color: "#8a8f98" }}>{m.unit}</span>
              </div>
              <div style={{ marginTop: 6, fontSize: 19, color: "#8a8f98" }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
