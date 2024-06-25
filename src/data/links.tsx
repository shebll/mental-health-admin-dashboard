import {
  LayoutDashboardIcon,
  Users,
  UserCheck,
  Activity,
  Calendar,
} from "lucide-react";
import { ReactElement } from "react";

export const sideBarLinks: {
  name: string;
  href: string;
  icon: ReactElement;
}[] = [
  {
    name: "dashboard",
    href: "/",
    icon: <LayoutDashboardIcon />,
  },
  { name: "users", href: "/users", icon: <Users /> },
  { name: "forums", href: "/forums", icon: <Activity /> },
  { name: "doctors", href: "/doctors", icon: <UserCheck /> },
  { name: "appointments", href: "/appointments", icon: <Calendar /> },
];
