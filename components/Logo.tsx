import Image from "next/image";
import Link from "next/link";
import { media } from "@/lib/media";
import { cn } from "@/lib/utils";

interface Props {
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  partnerImageClassName?: string;
  /** "light" = logo para fondo oscuro. "header" / "dark" = logo para fondo claro. */
  variant?: "light" | "header" | "dark";
  /** Muestra El Abogado Judío y Neuhauser Law lado a lado */
  dual?: boolean;
}

const imageBaseClass = "w-auto shrink-0 bg-transparent object-contain object-left";

const variantConfig = {
  light: {
    src: media.logo,
    partnerSrc: media.logoNeuhauser,
    width: 1390,
    height: 489,
    partnerWidth: 2376,
    partnerHeight: 651,
    className: "h-[54px] sm:h-[59px] lg:h-[65px]",
    partnerClassName:
      "h-[38px] sm:h-[44px] lg:h-[48px] max-w-[128px] sm:max-w-[148px] lg:max-w-[168px]",
    dividerClass: "bg-white/20",
  },
  header: {
    src: media.logoHeader,
    partnerSrc: media.logoNeuhauserDark,
    width: 1390,
    height: 489,
    partnerWidth: 2376,
    partnerHeight: 651,
    className:
      "h-[49px] sm:h-[54px] lg:h-[59px] max-w-[144px] sm:max-w-[160px] lg:max-w-[176px]",
    partnerClassName:
      "h-[38px] sm:h-[44px] lg:h-[48px] max-w-[128px] sm:max-w-[148px] lg:max-w-[168px]",
    dividerClass: "bg-ink/15",
  },
  dark: {
    src: media.logoDark,
    partnerSrc: media.logoNeuhauserDark,
    width: 1390,
    height: 489,
    partnerWidth: 2376,
    partnerHeight: 651,
    className: "h-[54px] sm:h-[59px] lg:h-[65px]",
    partnerClassName:
      "h-[38px] sm:h-[44px] lg:h-[48px] max-w-[128px] sm:max-w-[148px] lg:max-w-[168px]",
    dividerClass: "bg-ink/15",
  },
} as const;

export default function Logo({
  priority = false,
  className = "",
  imageClassName,
  partnerImageClassName,
  variant = "light",
  dual = false,
}: Props) {
  const config = variantConfig[variant];

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex shrink-0 items-center",
        dual && "gap-2.5 sm:gap-3 lg:gap-4",
        className
      )}
    >
      <Image
        src={config.src}
        alt="El Abogado Judío"
        width={config.width}
        height={config.height}
        priority={priority}
        className={cn(imageBaseClass, imageClassName ?? config.className)}
      />
      {dual && (
        <>
          <span
            className={cn(
              "hidden h-7 w-px shrink-0 sm:block lg:h-8",
              config.dividerClass
            )}
            aria-hidden
          />
          <Image
            src={config.partnerSrc}
            alt="Neuhauser Law PLLC"
            width={config.partnerWidth}
            height={config.partnerHeight}
            priority={priority}
            className={cn(
              imageBaseClass,
              partnerImageClassName ?? config.partnerClassName
            )}
          />
        </>
      )}
    </Link>
  );
}
