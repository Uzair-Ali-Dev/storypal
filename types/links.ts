import { LucideIcon } from "lucide-react";

export interface INavLink {
  name: string;
  link: string;
  icon?: LucideIcon;
  showOnMobile?: boolean;
}
