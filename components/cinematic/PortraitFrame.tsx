import MediaSlot from "@/components/cinematic/MediaSlot";
import { cn } from "@/lib/utils";

/** Editorial cut: bottom-right corner chamfered; scales via --portrait-cut */
const clipEditorial =
  "[clip-path:polygon(0_0,100%_0,100%_calc(100%-var(--portrait-cut)),calc(100%-var(--portrait-cut))_100%,0_100%)]";

interface Props {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

export default function PortraitFrame({ src, alt, priority, className }: Props) {
  return (
    <div
      className={cn(
        "relative mx-auto aspect-[4/5] w-full max-w-md transform-none",
        "[--portrait-cut:36px] sm:[--portrait-cut:52px]",
        "drop-shadow-[0_24px_60px_rgba(0,0,0,0.4)]",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-3 -top-3 z-10 h-24 w-24 border-l-2 border-t-2 border-gold"
      />

      <div className={cn("relative h-full w-full transform-none", clipEditorial)}>
        <div
          aria-hidden
          className={cn("absolute inset-0 bg-gold", clipEditorial)}
        />
        <div
          className={cn(
            "absolute inset-[2px] overflow-hidden bg-ink transform-none",
            clipEditorial
          )}
        >
          <MediaSlot
            src={src}
            alt={alt}
            priority={priority}
            className="!transform-none object-[center_15%]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent"
          />
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-2 left-1/2 h-px w-24 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/70 to-transparent"
      />
    </div>
  );
}
