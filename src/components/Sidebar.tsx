"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboardIcon, SidebarOpenIcon } from "lucide-react";
import { useAuth } from "@/providers/AuthContext";
import { usePathname } from "next/navigation";

const links: {
  name: string;
  href: string;
}[] = [
  { name: "dashboard", href: "/" },
  { name: "users", href: "/users" },
  { name: "forums", href: "/forums" },
  { name: "doctors", href: "/doctors" },
];
export function Sidebar() {
  const { logout, user } = useAuth();
  const pathName = usePathname();
  return (
    <div className="bg-secondary px-2 py-10 w-[300px] flex flex-col justify-between">
      <div className="flex flex-col gap-20 ">
        <div className="flex items-center px-4 py-2 border-1 rounded-lg">
          <Image
            width={60}
            height={60}
            className="rounded-full"
            src={user?.photoUrl as string}
            alt={"user image"}
          />
          <div className="ml-3">
            <p className="text-base font-medium ">{user?.name}</p>
            <p className="text-base font-medium">{user?.email}</p>
          </div>
        </div>
        <ul className="flex gap-1 flex-col">
          {links.map((link, i) => (
            <li
              key={i}
              className={`flex gap-2 w-full py-2 px-4 bg-background/15 rounded-md hover:bg-background/50 transition-all ${
                pathName == link.href && "bg-background/50"
              }`}
            >
              <LayoutDashboardIcon className="h-6 w-6" />
              <Link href={link.href} className="w-full capitalize">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Button
          variant={"ghost"}
          onClick={() => {
            logout();
          }}
          className="w-full"
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
