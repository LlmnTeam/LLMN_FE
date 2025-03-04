// 외부 라이브러리
import React, { useState } from "react";

// 서버 사이드 데이터, 타입 및 API
import type { AlarmList } from "@/src/types/commons/header-type";

// 프로젝트 내부 컴포넌트
import Header from "./header";
import Sidebar from "./sidebar";

interface LayoutProps {
  nickname?: string | null;
  AlarmListSSR?: AlarmList | null;
  unreadAlarmCount?: number;
  children: React.ReactNode;
  scrollContainerRef?: React.RefObject<HTMLDivElement>;
}

export default function Layout({
  nickname,
  AlarmListSSR,
  unreadAlarmCount,
  children,
  scrollContainerRef,
}: LayoutProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="w-screen full-height overflow-hidden">
      <Header
        nickname={nickname}
        toggleSidebar={toggleSidebar}
        AlarmListSSR={AlarmListSSR}
        unreadAlarmCount={unreadAlarmCount}
      />
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <div
        ref={scrollContainerRef}
        className="w-full h-[calc(100%-70px)] mt-[70px] pt-[20px] pb-[40px] xl:ml-[290px] xl:w-[calc(100%-290px)] overflow-y-auto overflow-x-hidden custom-scrollbar"
      >
        {children}
      </div>
    </div>
  );
}
