import { ImageResponse } from "next/og";
import { getProductByHandle } from "@/lib/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = getProductByHandle(handle);
  const title = product?.name ?? "Ferrous";
  const subtitle = product ? `${product.categoryLabel} · ₹${product.price.amount.toLocaleString("en-IN")}` : "Considered clothing";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#1a1815",
          color: "#f5f1e8",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          overflow: "hidden",
          padding: "66px",
          position: "relative",
          width: "100%",
        }}
      >
        <div style={{ background: "#9c4739", display: "flex", height: "520px", position: "absolute", right: "-70px", top: "-90px", transform: "rotate(18deg)", width: "350px" }} />
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 9, textTransform: "uppercase" }}>Ferrous</div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "790px" }}>
          <div style={{ display: "flex", fontFamily: "serif", fontSize: 92, letterSpacing: -4, lineHeight: 0.96 }}>{title}</div>
          <div style={{ display: "flex", fontSize: 29, letterSpacing: 1, marginTop: 30 }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, textTransform: "uppercase" }}>Made to be worn</div>
      </div>
    ),
    size,
  );
}
