import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

const fadeMask =
  "[-webkit-mask-image:linear-gradient(to_bottom,black_72%,transparent_100%)] [mask-image:linear-gradient(to_bottom,black_72%,transparent_100%)]";

export default function PortraitFrame({ src, alt, priority, className }: Props) {
  return (
    <div className={cn("relative aspect-[578/840] w-full", fadeMask, className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 300px, 380px"
        className="object-contain object-top"
      />
    </div>
  );
}
