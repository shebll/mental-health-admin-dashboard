import { Sidebar } from "@/components/Sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nexus Admin Dashboard",
  description: "Nexus Admin Dashboard for mental health ",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-4 md:p-6 lg:p-10 2xl:p-20 h-screen overflow-auto">
        {children}
      </div>
    </div>
  );
}
