import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  return (
    <div className="flex flex-row justify-between items-center h-[70px] fixed top-0 w-full z-20 bg-white border-b border-[#717478] pt-5 pb-3 pl-8 pr-1">
      {/* <div className="flex flex-row justify-center items-center gap-3 w-full relative xs:justify-start xs:w-[120px]"> */}
      <div className="flex flex-row justify-start items-center gap-3 w-full relative xs:w-[120px]">
        <div className="absolute -left-7 xl:hidden cursor-pointer">
          <Image
            src="/images/menu.svg"
            alt="menu"
            width={40}
            height={40}
            onClick={toggleSidebar}
          />
        </div>
        <Image
          src="/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="ml-4"
        />
        <span className="text-2xl font-semibold">LLMN</span>
      </div>
      {/* <div className="hidden xs:flex flex-row justify-center items-center relative w-[271px] h-[36px]">
        <input
          type="text"
          placeholder="검색"
          className="h-[36px] bg-gray-100 rounded-full focus:outline-none pl-7 ml-12"
        />
        <div className="absolute right-12">
          <Image src="/images/search.svg" alt="search" width={20} height={20} />
        </div>
      </div> */}
      <div className="flex flex-row justify-center items-center gap-3 xs:gap-5 absolute right-3 xs:relative">
        <div className="flex flex-row justify-start items-center sm:pr-1">
          <Link href="/search">
            <Image
              src="/images/search.svg"
              alt="search"
              width={25}
              height={25}
              className="w-[20px] h-[20px] xs:w-[25px] xs:h-[25px] cursor-pointer"
            />
          </Link>
        </div>
        <div className="flex flex-row justify-start items-center xs:gap-2">
          <Image
            src="/images/alarm.svg"
            alt="alarm"
            width={25}
            height={28}
            className="w-[20px] h-[23px] xs:w-[25px] xs:h-[28px] cursor-pointer"
          />
          <span className="text-[18px] font-medium hidden sm:inline">1</span>
        </div>
        <div className="flex flex-row justify-start items-center gap-2">
          <Image
            src="/images/profile.svg"
            alt="profile"
            width={30}
            height={30}
            className="w-[25px] h-[25px] xs:w-[30px] xs:h-[30px] cursor-pointer"
          />
          <span className="text-[18px] font-medium hidden sm:inline">
            호예이
          </span>
          <Image
            src="/images/chevron-down.svg"
            alt="chevron-down"
            width={16}
            height={10}
            className="hidden sm:inline"
          />
        </div>
        <div className="hidden xs:flex flex-row justify-start items-center gap-2">
          <Image src="/images/logout.svg" alt="logout" width={25} height={24} />
          <span className="text-[18px] font-medium hidden sm:inline cursor-pointer">
            로그아웃
          </span>
        </div>
      </div>
    </div>
  );
}
