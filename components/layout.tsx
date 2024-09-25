import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "./header";
import Sidebar from "./sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <div className="pt-[70px] w-screen lg:ml-[290px] lg:w-[calc(100%-290px)]">
        {children}
      </div>
    </div>
  );
}
