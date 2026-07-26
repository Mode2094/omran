"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
}

export default function Card({ children, className, hover = true, padding = "md" }: CardProps) {
  const paddings = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={cn(
        "bg-white rounded-2xl border border-gray-100 shadow-sm font-arabic",
        hover && "transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary-100",
        paddings[padding],
        className
      )}
    >
      {children}
    </div>
  );
}
