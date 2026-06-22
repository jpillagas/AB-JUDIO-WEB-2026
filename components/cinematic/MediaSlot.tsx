import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  fill?: boolean;
}

export default function MediaSlot({
  src,
  alt,
  priority = false,
  className = "",
  fill = true,
}: Props) {
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      priority={priority}
      sizes="(max-width: 1024px) 100vw, 50vw"
      className={`object-cover ${className}`}
    />
  );
}
