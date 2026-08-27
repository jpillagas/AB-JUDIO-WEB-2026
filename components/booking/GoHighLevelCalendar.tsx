"use client";

import Script from "next/script";

interface Props {
  src: string;
  iframeId: string;
}

export default function GoHighLevelCalendar({ src, iframeId }: Props) {
  return (
    <>
      <iframe
        src={src}
        allow="payment"
        scrolling="no"
        id={iframeId}
        title="Calendario de citas"
        className="min-h-[720px] w-full border-0"
        style={{ width: "100%", border: "none", overflow: "hidden" }}
      />
      <Script
        src="https://link.sedigital.pro/js/form_embed.js"
        strategy="lazyOnload"
      />
    </>
  );
}
