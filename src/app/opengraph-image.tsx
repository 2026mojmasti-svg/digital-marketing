import { ImageResponse } from "next/og";

export const alt = "Ferrous — considered clothing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "#eee9df",
          color: "#1a1815",
          display: "flex",
          height: "100%",
          overflow: "hidden",
          padding: "66px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            background: "#9c4739",
            display: "flex",
            height: "420px",
            position: "absolute",
            right: "-75px",
            top: "-104px",
            transform: "rotate(-11deg)",
            width: "430px",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", fontSize: 28, letterSpacing: 9, textTransform: "uppercase" }}>Ferrous</div>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: "760px" }}>
            <div style={{ display: "flex", fontFamily: "serif", fontSize: 104, letterSpacing: -5, lineHeight: 0.94 }}>
              Considered clothing.
            </div>
            <div style={{ display: "flex", fontSize: 30, letterSpacing: 1, marginTop: 34 }}>
              Daily wear, party edits, and pieces with presence.
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, textTransform: "uppercase" }}>Worn your way</div>
        </div>
      </div>
    ),
    size,
  );
}
