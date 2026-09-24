"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { trackMetaEvent } from "@/lib/metaPixel";

interface Props {
  src: string;
  iframeId: string;
}

export default function GoHighLevelCalendar({ src, iframeId }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const trackedRef = useRef(false);

  useEffect(() => {
    if (trackedRef.current) return;
    trackedRef.current = true;
    trackMetaEvent("Schedule", { content_name: `calendario_${iframeId}` });
  }, [iframeId]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const onMessage = (event: MessageEvent) => {
      if (!event.data || typeof event.data !== "object") return;
      const height =
        event.data.height ??
        event.data.frameHeight ??
        event.data?.payload?.height;
      if (typeof height === "number" && height > 200) {
        iframe.style.height = `${height}px`;
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <>
      <iframe
        ref={iframeRef}
        src={src}
        allow="payment"
        id={iframeId}
        title="Calendario de citas"
        className="w-full border-0"
        style={{
          width: "100%",
          minHeight: "1400px",
          height: "1400px",
          border: "none",
          overflow: "auto",
        }}
      />
      <Script
        src="https://link.sedigital.pro/js/form_embed.js"
        strategy="lazyOnload"
      />
    </>
  );
}
