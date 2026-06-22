import Image from "next/image";
import Link from "next/link";
import { media } from "@/lib/media";

interface Props {
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  /** "light" = logo blanco (footer). "header" = LogoPrincipal. "dark" = logo oscuro legacy. */
  variant?: "light" | "header" | "dark";
}

const variantConfig = {
  light: {
    src: media.logo,
    width: 320,
    height: 64,
    className: "h-10 w-auto sm:h-11 lg:h-12",
  },
  header: {
    src: media.logoHeader,
    width: 1003,
    height: 175,
    className: "h-9 w-auto sm:h-10 lg:h-11 max-w-[220px] sm:max-w-[260px] lg:max-w-[300px]",
  },
  dark: {
    src: media.logoDark,
    width: 320,
    height: 64,
    className: "h-10 w-auto sm:h-11 lg:h-12",
  },
} as const;

export default function Logo({
  priority = false,
  className = "",
  imageClassName,
  variant = "light",
}: Props) {
  const config = variantConfig[variant];

  return (
    <Link href="/" className={`inline-flex shrink-0 items-center ${className}`}>
      <Image
        src={config.src}
        alt="El Abogado Judio – Neuhauser Law"
        width={config.width}
        height={config.height}
        priority={priority}
        className={imageClassName ?? config.className}
      />
    </Link>
  );
}
