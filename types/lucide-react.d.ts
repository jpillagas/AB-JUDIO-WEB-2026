declare module "lucide-react" {
  import type { ComponentType, SVGProps } from "react";
  export interface LucideProps extends SVGProps<SVGSVGElement> {
    size?: string | number;
    absoluteStrokeWidth?: boolean;
  }
  export type LucideIcon = ComponentType<LucideProps>;
  // Catch-all export so any imported icon name is typed as a component.
  const icon: LucideIcon;
  export default icon;
  export const Menu: LucideIcon;
  export const X: LucideIcon;
  export const MessageCircle: LucideIcon;
  export const Scale: LucideIcon;
  export const Phone: LucideIcon;
  export const Mail: LucideIcon;
  export const MapPin: LucideIcon;
  export const Facebook: LucideIcon;
  export const Instagram: LucideIcon;
  export const ArrowRight: LucideIcon;
  export const ArrowLeft: LucideIcon;
  export const Check: LucideIcon;
  export const Quote: LucideIcon;
  export const Play: LucideIcon;
  export const Plus: LucideIcon;
  export const Minus: LucideIcon;
  export const Clock: LucideIcon;
  export const CheckCircle2: LucideIcon;
  export const Loader2: LucideIcon;
}
