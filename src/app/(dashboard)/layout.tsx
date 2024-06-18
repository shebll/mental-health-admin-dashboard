"use client";
import { Sidebar } from "@/components/Sidebar";
import { useAuth } from "@/context/AuthContext";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, user } = useAuth();
  if (token && user) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col gap-4 h-screen overflow-auto">
          <div className="p-4 md:p-6 lg:p-10 2xl:p-20 ">{children}</div>
        </div>
      </div>
    );
  }
}
