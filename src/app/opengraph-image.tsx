import { ImageResponse } from "next/og";

export const alt = "Codeeee Labs — Software House in Karachi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#030303",
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(147,51,234,0.25), transparent 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontStyle: "italic",
            fontWeight: 900,
            letterSpacing: "-4px",
            lineHeight: 0.9,
          }}
        >
          <span style={{ fontSize: 140, color: "#ffffff" }}>CODEEEE</span>
          <span style={{ fontSize: 140, color: "#6b7280" }}>LABS</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginTop: 48,
          }}
        >
          <div style={{ width: 60, height: 2, background: "#9333ea" }} />
          <span
            style={{
              fontSize: 26,
              color: "#9ca3af",
              textTransform: "uppercase",
              letterSpacing: "6px",
            }}
          >
            Web Apps · AI Automation · Mobile · CRMs
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
