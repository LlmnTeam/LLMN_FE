import React, { useState } from "react";
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
    <div className="w-screen h-screen overflow-hidden">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <div className="w-full h-[calc(100%-70px)] mt-[70px] pt-[20px] pb-[40px] xl:ml-[290px] xl:w-[calc(100%-290px)] px-5 xs:px-7 sm:px-10 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
