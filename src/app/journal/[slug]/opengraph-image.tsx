import { ImageResponse } from "next/og";
import { getJournalPost } from "@/lib/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getJournalPost(slug);
  const title = post?.title ?? "The Ferrous Journal";
  const subtitle = post?.dek ?? "Stories and styling notes from Ferrous.";

  return new ImageResponse(
    (
      <div style={{ background: "#e7dfd2", color: "#1a1815", display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between", overflow: "hidden", padding: "66px", position: "relative", width: "100%" }}>
        <div style={{ background: "#807264", display: "flex", height: "460px", position: "absolute", right: "-30px", top: "-140px", transform: "rotate(-23deg)", width: "420px" }} />
        <div style={{ display: "flex", fontSize: 24, letterSpacing: 7, textTransform: "uppercase" }}>The Ferrous Journal</div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "810px" }}>
          <div style={{ display: "flex", fontFamily: "serif", fontSize: 76, letterSpacing: -3, lineHeight: 0.97 }}>{title}</div>
          <div style={{ display: "flex", fontSize: 28, lineHeight: 1.3, marginTop: 28 }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, textTransform: "uppercase" }}>Style, considered</div>
      </div>
    ),
    size,
  );
}
