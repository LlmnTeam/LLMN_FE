import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useCallback, useEffect, useRef, useState } from "react";
import { cls } from "@/utils/class-utils";
import { Alarm, AlarmList } from "@/types/commons/header-type";
import { submitAlarmRead } from "@/api/commons/header-api";

interface HeaderProps {
  nickname?: string | null;
  AlarmListSSR?: AlarmList | null;
  unreadAlarmCount?: number;
  toggleSidebar: () => void;
}

const PAGE_SIZE = 10;

export default function Header({
  nickname = "",
  AlarmListSSR,
  unreadAlarmCount = 0,
  toggleSidebar,
}: HeaderProps) {
  const router = useRouter();
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);
  const [displayedAlarms, setDisplayedAlarms] = useState<Alarm[]>([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(unreadAlarmCount);

  const containerRef = useRef<HTMLDivElement>(null);

  const loadMoreAlarms = useCallback(() => {
    if (!AlarmListSSR?.alarms) return;

    const newAlarms = AlarmListSSR.alarms.slice(0, page * PAGE_SIZE);
    setDisplayedAlarms(newAlarms);
  }, [AlarmListSSR, page]);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setTimeout(() => {
          setPage((prevPage) => prevPage + 1);
        }, 500);
      }
    }
  }, []);

  useEffect(() => {
    loadMoreAlarms();
  }, [page, loadMoreAlarms]);

  const handleAlarmButton = async () => {
    setIsAlarmOpen((prev) => !prev);
  };

  const handleAlarmClick = async (id: number): Promise<boolean> => {
    if (count <= 0) return false;

    const result = await submitAlarmRead(id);
    if (result) {
      const newCount = count - 1;
      setCount(newCount);
      return true;
    }
    return false;
  };

  const handleLogoutButton = () => {
    sessionStorage.clear();
    Cookies.remove("accessToken", { path: "/" });
    Cookies.remove("refreshToken", { path: "/" });
    router.push("/login");
  };

  return (
    <div className="flex flex-row justify-between items-center h-[70px] fixed top-0 w-full z-20 bg-white border-b border-[#717478] pt-5 pb-3 pl-8 pr-1">
      <div className="flex flex-row justify-start items-center gap-3 w-full relative xs:w-[120px]">
        <div className="absolute -left-7 xl:hidden cursor-pointer">
          <Image
            src="/images/menu.svg"
            alt="menu"
            width={40}
            height={40}
            onClick={toggleSidebar}
            priority
          />
        </div>
        <Image
          src="/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="ml-4 cursor-pointer"
          onClick={() => router.push("/dashboard")}
          priority
        />
        <span
          className="text-2xl font-semibold cursor-pointer"
          onClick={() => router.push("/dashboard")}
        >
          LLMN
        </span>
      </div>
      <div className="flex flex-row justify-center items-center gap-3 xs:gap-5 absolute right-3 xs:relative">
        <div className="flex flex-row justify-start items-center sm:pr-1">
          <Link href="/search">
            <Image
              src="/images/search.svg"
              alt="search"
              width={25}
              height={25}
              className="w-[20px] h-[20px] xs:w-[25px] xs:h-[25px] cursor-pointer"
              priority
            />
          </Link>
        </div>
        <div className="flex flex-row justify-start items-center relative xs:gap-2">
          <Image
            src="/images/alarm.svg"
            alt="alarm"
            width={25}
            height={28}
            className="w-[20px] h-[23px] xs:w-[25px] xs:h-[28px] cursor-pointer"
            onClick={handleAlarmButton}
            priority
          />
          <span
            className={cls(
              "absolute bg-red-500 text-white font-medium rounded-full",
              "w-[19px] aspect-square text-[8px] -top-[4px] left-[11px]",
              "xs:w-[22px] aspect-square xs:text-[10px] xs:-top-[5.5px] xs:left-[12.5px]",
              "sm:w-[25px] aspect-square sm:text-[12px] sm:-top-[7px] sm:left-[14px]",
              count === 0 ? "hidden" : "flex justify-center items-center"
            )}
          >
            {count > 99 ? "99+" : count}
          </span>
          <div
            className={cls(
              "flex flex-col justify-start items-center absolute top-[42.9px] xs:top-[45.5px] -left-[147.2px] xs:-left-[162px] sm:-left-[142px] w-[250px] xs:w-[300px] sm:w-[405px] h-[311px] xs:h-[441px] sm:h-[593px] border border-t-0 border-[#717478] bg-white overflow-hidden transition-all duration-500 ease-in-out",
              isAlarmOpen
                ? "max-h-[311px] xs:max-h-[441px] sm:max-h-[593px] border-b-1"
                : "max-h-0 border-b-0"
            )}
          >
            <div className="flex flex-row justify-start items-center w-full text-[14px] xs:text-[16px] sm:text-[18px] font-bold px-5 xs:px-6 sm:px-7 py-3 xs:py-4 sm:py-5 border-b border-[#717478]">
              알림
            </div>
            <div
              ref={containerRef}
              onScroll={handleScroll}
              className="flex flex-col justify-start items-center w-full overflow-y-auto overflow-x-hidden custom-scrollbar"
            >
              {displayedAlarms &&
                displayedAlarms.map((alarm) => (
                  <div
                    className="flex flex-row justify-start items-center w-full border-b border-b-gray-200 hover:bg-[#F8F8F8] py-2 xs:py-3 sm:py-4 pl-4 xs:pl-5 sm:pl-6 gap-3 xs:gap-4 sm:gap-5 cursor-pointer"
                    key={alarm.id}
                    onClick={async () => {
                      if (alarm.isRead) return;
                      const result = await handleAlarmClick(alarm.id);
                      if (result) alarm.isRead = true;
                    }}
                  >
                    <div>
                      <Image
                        src={`/images/${
                          alarm.type === "UPDATE" ? "alarm" : "alert"
                        }-${alarm.isRead === true ? "active" : "inactive"}.svg`}
                        alt="alarm"
                        width={40}
                        height={40}
                        className="w-[30px] h-[30px] xs:w-[35px] xs:h-[35px] sm:w-[40px] sm:h-[40px] cursor-pointer"
                        onClick={handleAlarmButton}
                        priority
                      />
                    </div>
                    <div className="flex flex-col justify-center items-start w-full">
                      <div className="flex flex-row justify-start items-center w-full">
                        <div className="text-[13px] xs:text-[14px] sm:text-[15px] font-bold">
                          {alarm.type === "UPDATE" ? "업데이트" : "심각"}
                        </div>
                        {/* <div className="inline sm:hidden text-[8px] xs:text-[9px] sm:text-[10px] text-gray-500">
                          {alarm.generatedDate}
                        </div> */}
                      </div>
                      <div className="text-[11px] xs:text-[12px] sm:text-[13px]">
                        {alarm.content}
                      </div>
                    </div>
                  </div>
                ))}
              {displayedAlarms ? (
                <div className="py-2 xs:py-3 sm:py-4 flex flex-row justify-center items-center">
                  <div className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 border-[1.5px] xs:border-2 sm:border-[2.5px] border-gray-700 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-start items-center gap-2">
          <Image
            src="/images/profile.svg"
            alt="profile"
            width={30}
            height={30}
            className="w-[25px] h-[25px] xs:w-[30px] xs:h-[30px] cursor-pointer"
            priority
          />
          <span className="text-[18px] font-medium hidden sm:inline">
            {nickname}
          </span>
          {/* <Image
            src="/images/chevron-down.svg"
            alt="chevron-down"
            width={16}
            height={10}
            className="hidden sm:inline"
            priority
          /> */}
        </div>
        <div
          className="flex flex-row justify-start items-center gap-2"
          onClick={handleLogoutButton}
        >
          <Image
            src="/images/logout.svg"
            alt="logout"
            width={27}
            height={26}
            className="w-[22px] h-[21px] xs:w-[27px] xs:h-[26px] cursor-pointer"
            priority
          />
          <span className="text-[18px] font-medium hidden sm:inline cursor-pointer">
            로그아웃
          </span>
        </div>
      </div>
    </div>
  );
}
