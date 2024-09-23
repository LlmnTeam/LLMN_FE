import React from "react";
import { cls } from "@/libs/utils";
import { useRouter } from "next/router";

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
}

export default function Layout({ title, children }: LayoutProps) {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };
  return (
    <div>
      <div className="bg-slate-200">{title}</div>
      <div>{children}</div>
    </div>
  );
}
