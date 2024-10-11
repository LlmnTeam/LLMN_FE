import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function LogTable() {
  const router = useRouter();
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 900);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);
  return (
    <div className="log-table">
      {isLargeScreen ? (
        <div className="overflow-x-hidden">
          <table
            className="table-auto w-full max-w-[1200px] border-separate bg-[#F6F6F6] rounded-3xl border border-[#E5E7EB] px-5 text-[16px] mt-3"
            style={{ borderSpacing: "0 5px", tableLayout: "fixed" }}
          >
            <thead>
              <tr className="text-center">
                <th className="w-[10%] px-4 py-1 truncate">상태</th>
                <th className="w-[15%] px-4 py-1 text-left truncate">이름</th>
                <th className="w-[20%] px-4 py-1 text-left truncate">설명</th>
                <th className="w-[13%] px-4 py-1 truncate">CPU</th>
                <th className="w-[27%] px-4 py-1 truncate">Mem</th>
                <th className="w-[15%] px-4 py-1 truncate">컨테이너</th>
              </tr>
            </thead>
            <tbody>
              <tr
                className="text-center bg-white cursor-pointer"
                onClick={() => router.push("/log/1")}
              >
                <td className="w-[10%] px-4 py-2 truncate rounded-l-3xl overflow-hidden border-l border-t border-b border-transparent">
                  <div className="flex flex-row justify-center items-center">
                    <Image
                      src="/images/working.svg"
                      alt="working"
                      width={23}
                      height={24}
                    />
                  </div>
                </td>
                <td className="w-[15%] px-4 py-2 text-left truncate border-t border-b border-transparent">
                  Spring
                </td>
                <td className="w-[20%] px-4 py-2 text-left truncate border-t border-b border-transparent">
                  ForPaw BE - 스프링
                </td>
                <td className="w-[13%] px-4 py-2 truncate border-t border-b border-transparent">
                  8.46%
                </td>
                <td className="w-[27%] px-4 py-2 truncate border-t border-b border-transparent">
                  89.98MiB / 949.2MiB
                </td>
                <td className="w-[15%] px-4 py-2 truncate rounded-r-3xl overflow-hidden border-r border-t border-b border-transparent">
                  실행중
                </td>
              </tr>
              <tr
                className="text-center bg-white cursor-pointer"
                onClick={() => router.push("/log/1")}
              >
                <td className="w-[10%] px-4 py-2 truncate rounded-l-3xl overflow-hidden border-l border-t border-b border-transparent">
                  <div className="flex flex-row justify-center items-center">
                    <Image
                      src="/images/working.svg"
                      alt="working"
                      width={23}
                      height={24}
                    />
                  </div>
                </td>
                <td className="w-[15%] px-4 py-2 text-left truncate border-t border-b border-transparent">
                  MongoDB
                </td>
                <td className="w-[20%] px-4 py-2 text-left truncate border-t border-b border-transparent">
                  No RDBMS DB
                </td>
                <td className="w-[13%] px-4 py-2 truncate border-t border-b border-transparent">
                  N/A
                </td>
                <td className="w-[27%] px-4 py-2 truncate border-t border-b border-transparent">
                  N/A
                </td>
                <td className="w-[15%] px-4 py-2 truncate rounded-r-3xl overflow-hidden border-r border-t border-b border-transparent">
                  종료됨
                </td>
              </tr>
              <tr
                className="text-center bg-white cursor-pointer"
                onClick={() => router.push("/log/1")}
              >
                <td className="w-[10%] px-4 py-2 truncate rounded-l-3xl overflow-hidden border-l border-t border-b border-transparent">
                  <div className="flex flex-row justify-center items-center">
                    <Image
                      src="/images/not-working.svg"
                      alt="not-working"
                      width={23}
                      height={24}
                    />
                  </div>
                </td>
                <td className="w-[15%] px-4 py-2 text-left truncate border-t border-b border-transparent">
                  FastAPI
                </td>
                <td className="w-[20%] px-4 py-2 text-left truncate border-t border-b border-transparent">
                  ForPaw BE - FastAPI
                </td>
                <td className="w-[13%] px-4 py-2 truncate border-t border-b border-transparent">
                  N/A
                </td>
                <td className="w-[27%] px-4 py-2 truncate border-t border-b border-transparent">
                  N/A
                </td>
                <td className="w-[15%] px-4 py-2 truncate rounded-r-3xl overflow-hidden border-r border-t border-b border-transparent">
                  연결되지 않음
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-2 xs:gap-3 text-[14px] xs:text-[15px] mt-1 xs:mt-2">
          <div
            className="flex flex-col space-y-2 bg-[#F6F6F6] rounded-3xl border border-[#E5E7EB] pl-1 pr-2 py-2 cursor-pointer hover:border-gray-400"
            onClick={() => router.push("/log/1")}
          >
            <div className="flex">
              <div className="min-w-[80px] px-4 py-1 xs:py-2 font-bold">
                상태
              </div>
              <div className="flex-1 px-4 py-1 xs:py-2 bg-white rounded-3xl">
                <div className="flex flex-row justify-start items-center w-full">
                  <Image
                    src="/images/working.svg"
                    alt="working"
                    width={23}
                    height={24}
                    className="w-[20px] h-[21px] xs:w-[23px] xs:h-[24px]"
                  />
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="min-w-[80px] px-4 py-1 xs:py-2 font-bold">
                이름
              </div>
              <div className="flex-1 px-4 py-1 xs:py-2 bg-white rounded-3xl">
                Spring
              </div>
            </div>
            <div className="flex">
              <div className="min-w-[80px] px-4 py-1 xs:py-2 font-bold">
                설명
              </div>
              <div className="flex-1 px-4 py-1 xs:py-2 bg-white rounded-3xl truncate">
                ForPaw BE - 스프링
              </div>
            </div>
            <div className="flex">
              <div className="min-w-[80px] px-4 py-1 xs:py-2 font-bold">
                CPU
              </div>
              <div className="flex-1 px-4 py-1 xs:py-2 bg-white rounded-3xl truncate">
                8.46%
              </div>
            </div>
            <div className="flex">
              <div className="min-w-[80px] px-4 py-1 xs:py-2 font-bold">
                Mem
              </div>
              <div className="flex-1 px-4 py-1 xs:py-2 bg-white rounded-3xl truncate">
                89.98MiB / 949.2MiB
              </div>
            </div>
            <div className="flex">
              <div className="min-w-[80px] px-4 py-1 xs:py-2 font-bold">
                컨테이너
              </div>
              <div className="flex-1 px-4 py-1 xs:py-2 bg-white rounded-3xl truncate">
                실행중
              </div>
            </div>
          </div>
          <div
            className="flex flex-col space-y-2 bg-[#F6F6F6] rounded-3xl border border-[#E5E7EB] pl-1 pr-2 py-2 cursor-pointer hover:border-gray-400"
            onClick={() => router.push("/log/1")}
          >
            <div className="flex">
              <div className="min-w-[80px] px-4 py-1 xs:py-2 font-bold">
                상태
              </div>
              <div className="flex-1 px-4 py-1 xs:py-2 bg-white rounded-3xl">
                <div className="flex flex-row justify-start items-center w-full">
                  <Image
                    src="/images/working.svg"
                    alt="working"
                    width={23}
                    height={24}
                    className="w-[20px] h-[21px] xs:w-[23px] xs:h-[24px]"
                  />
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="min-w-[80px] px-4 py-1 xs:py-2 font-bold">
                이름
              </div>
              <div className="flex-1 px-4 py-1 xs:py-2 bg-white rounded-3xl">
                MongoDB
              </div>
            </div>
            <div className="flex">
              <div className="min-w-[80px] px-4 py-1 xs:py-2 font-bold">
                설명
              </div>
              <div className="flex-1 px-4 py-1 xs:py-2 bg-white rounded-3xl truncate">
                No RDBMS DB
              </div>
            </div>
            <div className="flex">
              <div className="min-w-[80px] px-4 py-1 xs:py-2 font-bold">
                CPU
              </div>
              <div className="flex-1 px-4 py-1 xs:py-2 bg-white rounded-3xl truncate">
                N/A
              </div>
            </div>
            <div className="flex">
              <div className="min-w-[80px] px-4 py-1 xs:py-2 font-bold">
                Mem
              </div>
              <div className="flex-1 px-4 py-1 xs:py-2 bg-white rounded-3xl truncate">
                N/A
              </div>
            </div>
            <div className="flex">
              <div className="min-w-[80px] px-4 py-1 xs:py-2 font-bold">
                컨테이너
              </div>
              <div className="flex-1 px-4 py-1 xs:py-2 bg-white rounded-3xl truncate">
                종료됨
              </div>
            </div>
          </div>
          <div
            className="flex flex-col space-y-2 bg-[#F6F6F6] rounded-3xl border border-[#E5E7EB] pl-1 pr-2 py-2 cursor-pointer hover:border-gray-400"
            onClick={() => router.push("/log/1")}
          >
            <div className="flex">
              <div className="min-w-[80px] px-4 py-1 xs:py-2 font-bold">
                상태
              </div>
              <div className="flex-1 px-4 py-1 xs:py-2 bg-white rounded-3xl">
                <div className="flex flex-row justify-start items-center w-full">
                  <Image
                    src="/images/not-working.svg"
                    alt="not-working"
                    width={23}
                    height={24}
                    className="w-[20px] h-[21px] xs:w-[23px] xs:h-[24px]"
                  />
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="min-w-[80px] px-4 py-1 xs:py-2 font-bold">
                이름
              </div>
              <div className="flex-1 px-4 py-1 xs:py-2 bg-white rounded-3xl">
                FastAPI
              </div>
            </div>
            <div className="flex">
              <div className="min-w-[80px] px-4 py-1 xs:py-2 font-bold">
                설명
              </div>
              <div className="flex-1 px-4 py-1 xs:py-2 bg-white rounded-3xl truncate">
                ForPaw BE - FastAPI
              </div>
            </div>
            <div className="flex">
              <div className="min-w-[80px] px-4 py-1 xs:py-2 font-bold">
                CPU
              </div>
              <div className="flex-1 px-4 py-1 xs:py-2 bg-white rounded-3xl truncate">
                N/A
              </div>
            </div>
            <div className="flex">
              <div className="min-w-[80px] px-4 py-1 xs:py-2 font-bold">
                Mem
              </div>
              <div className="flex-1 px-4 py-1 xs:py-2 bg-white rounded-3xl truncate">
                N/A
              </div>
            </div>
            <div className="flex">
              <div className="min-w-[80px] px-4 py-1 xs:py-2 font-bold">
                컨테이너
              </div>
              <div className="flex-1 px-4 py-1 xs:py-2 bg-white rounded-3xl truncate">
                연결되지 않음
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
