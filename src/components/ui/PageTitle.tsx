import { cn } from "@/utils/utils";
import React from "react";

type Props = {
  title: string;
  className?: string;
};

export default function PageTitle({ title, className }: Props) {
  return (
    <h1 className={cn("ml-10 lg:ml-0 text-2xl font-semibold", className)}>
      {title}
    </h1>
  );
}
