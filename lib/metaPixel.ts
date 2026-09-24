export type MetaStandardEvent =
  | "PageView"
  | "Contact"
  | "Schedule"
  | "Lead"
  | "ViewContent"
  | (string & {});

declare global {
  interface Window {
    fbq?: (
      command: "track" | "trackCustom" | "init",
      eventOrId: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

/** Dispara un evento estándar del Meta Pixel si fbq está disponible. */
export function trackMetaEvent(
  event: MetaStandardEvent,
  params?: Record<string, unknown>
) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") {
    return;
  }
  if (params) {
    window.fbq("track", event, params);
  } else {
    window.fbq("track", event);
  }
}
