import { cls } from "@/libs/utils";
import Image from "next/image";

interface SidebarProps {
  isSidebarOpen: boolean;
}

export default function Sidebar({ isSidebarOpen }: SidebarProps) {
  return (
    <div
      className={cls(
        "flex flex-col justify-start items-center fixed left-0 w-[290px] h-[calc(100%-69px)] mt-[69px] border border-r-[#E5E7EB]",
        `lg:translate-x-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`
      )}
    >
      sidebar
    </div>
  );
}
