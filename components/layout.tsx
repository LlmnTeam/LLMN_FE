import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "./header";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();

  const onClick = () => {
    router.back();
  };

  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  );
}
