import { ImageResponse } from "next/og";

export const runtime = "edge";

const size = {
  width: 1200,
  height: 630
};

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background: "#0c0a14",
          color: "#ffffff",
          fontFamily: "Inter, Arial, sans-serif",
          padding: 72
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(123, 63, 242, 0.38), rgba(12, 10, 20, 0) 54%)"
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 72,
            right: 72,
            top: 72,
            bottom: 72,
            border: "1px solid rgba(216, 204, 255, 0.22)"
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: 360,
            height: "100%",
            background: "rgba(123, 63, 242, 0.18)"
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%"
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 72,
                height: 72,
                borderRadius: 12,
                background: "#7b3ff2",
                color: "#ffffff",
                fontSize: 28,
                fontWeight: 900
              }}
            >
              RT
            </div>
            <div
              style={{
                marginLeft: 22,
                display: "flex",
                flexDirection: "column"
              }}
            >
              <div style={{ fontSize: 24, fontWeight: 800, color: "#d8ccff" }}>
                Technical Computer Science
              </div>
              <div style={{ marginTop: 6, fontSize: 22, color: "rgba(255,255,255,0.72)" }}>
                Wrocław University of Science and Technology
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                maxWidth: 760,
                fontSize: 88,
                lineHeight: 0.95,
                fontWeight: 900,
                letterSpacing: 0
              }}
            >
              Robert Tworek
            </div>
            <div
              style={{
                marginTop: 26,
                maxWidth: 860,
                fontSize: 38,
                lineHeight: 1.2,
                fontWeight: 700,
                color: "rgba(255,255,255,0.9)"
              }}
            >
              Portfolio projektów: aplikacje, bazy danych, systemy i komunikacja sieciowa
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 24,
              fontWeight: 800,
              color: "#d8ccff"
            }}
          >
            Next.js / React / TypeScript / PostgreSQL
          </div>
        </div>
      </div>
    ),
    size
  );
}
