import EmptyBox from "@/components/commons/empty-box";
import InsightRecordContainer from "@/components/search/insight-record-container";
import InsightRecordModal from "@/components/search/insight-record-modal";
import Layout from "@/components/commons/layout";
import LogFileContainer from "@/components/search/log-file-container";
import SearchInput from "@/components/search/search-input";
import useInsightRecordModal from "@/hooks/search/use-insight-record-modal";
import { useEffect, useState } from "react";
import {
  ValidateLoginProps,
  getValidateLoginSSR,
} from "@/ssr/commons/validate-login-ssr";
import { GetServerSideProps } from "next";
import { Nickname } from "@/types/login/login-type";
import useSearchInput from "@/hooks/search/use-search-input";
import { formatToLocalISOString } from "@/utils/date-utils";
import { fetchSearchResult } from "@/api/search/search-api";
import { SearchResult } from "@/types/search/search-type";

const files = [
  { filename: "mongo-log-2024-09-10_12.txt" },
  { filename: "mongo-log-2024-09-11_12.txt" },
  { filename: "mongo-log-2024-09-12_12.txt" },
  { filename: "mongo-log-2024-09-13_12.txt" },
  { filename: "mongo-log-2024-09-14_12.txt" },
  { filename: "mongo-log-2024-09-15_12.txt" },
  { filename: "mongo-log-2024-09-16_12.txt" },
  { filename: "mongo-log-2024-09-17_12.txt" },
  { filename: "mongo-log-2024-09-18_12.txt" },
  { filename: "mongo-log-2024-09-19_12.txt" },
  { filename: "mongo-log-2024-09-13_12.txt" },
  { filename: "mongo-log-2024-09-14_12.txt" },
  { filename: "mongo-log-2024-09-15_12.txt" },
  { filename: "mongo-log-2024-09-16_12.txt" },
  { filename: "mongo-log-2024-09-17_12.txt" },
  { filename: "mongo-log-2024-09-18_12.txt" },
  { filename: "mongo-log-2024-09-13_12.txt" },
  { filename: "mongo-log-2024-09-14_12.txt" },
  { filename: "mongo-log-2024-09-15_12.txt" },
  { filename: "mongo-log-2024-09-16_12.txt" },
  { filename: "mongo-log-2024-09-17_12.txt" },
  { filename: "mongo-log-2024-09-18_12.txt" },
  { filename: "mongo-log-2024-09-13_12.txt" },
  { filename: "mongo-log-2024-09-14_12.txt" },
  { filename: "mongo-log-2024-09-15_12.txt" },
  { filename: "mongo-log-2024-09-16_12.txt" },
  { filename: "mongo-log-2024-09-17_12.txt" },
  { filename: "mongo-log-2024-09-18_12.txt" },
  { filename: "mongo-log-2024-09-13_12.txt" },
  { filename: "mongo-log-2024-09-14_12.txt" },
  { filename: "mongo-log-2024-09-15_12.txt" },
  { filename: "mongo-log-2024-09-16_12.txt" },
  { filename: "mongo-log-2024-09-17_12.txt" },
  { filename: "mongo-log-2024-09-18_12.txt" },
  // 더 많은 파일들...
];

const insightFiles = [
  { name: "Mongo", type: "일반요약", date: "2024-09-12 19:00" },
  { name: "Mongo", type: "일반요약", date: "2024-09-12 19:00" },
  { name: "Mongo", type: "일반요약", date: "2024-09-12 19:00" },
  { name: "Mongo", type: "일반요약", date: "2024-09-12 19:00" },
  { name: "Mongo", type: "일반요약", date: "2024-09-12 19:00" },
  { name: "Mongo", type: "일반요약", date: "2024-09-12 19:00" },
  { name: "Mongo", type: "일반요약", date: "2024-09-12 19:00" },
  { name: "Mongo", type: "일반요약", date: "2024-09-12 19:00" },
  { name: "Mongo", type: "일반요약", date: "2024-09-12 19:00" },
  { name: "Mongo", type: "일반요약", date: "2024-09-12 19:00" },
  { name: "Mongo", type: "일반요약", date: "2024-09-12 19:00" },
  { name: "Mongo", type: "일반요약", date: "2024-09-12 19:00" },
  { name: "Mongo", type: "일반요약", date: "2024-09-12 19:00" },
  { name: "Mongo", type: "일반요약", date: "2024-09-12 19:00" },
  { name: "Mongo", type: "일반요약", date: "2024-09-12 19:00" },
  { name: "Mongo", type: "일반요약", date: "2024-09-12 19:00" },
  { name: "Mongo", type: "일반요약", date: "2024-09-12 19:00" },
  { name: "Mongo", type: "일반요약", date: "2024-09-12 19:00" },
  { name: "Mongo", type: "일반요약", date: "2024-09-12 19:00" },
  { name: "Mongo", type: "일반요약", date: "2024-09-12 19:00" },
  { name: "Mongo", type: "일반요약", date: "2024-09-12 19:00" },
  // 더 많은 파일들...
];

export const getServerSideProps: GetServerSideProps<ValidateLoginProps> =
  getValidateLoginSSR;

export default function Search({ NicknameSSR }: ValidateLoginProps) {
  const [nickname, setNickname] = useState<Nickname | null>(NicknameSSR);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const { startDate, endDate, keyword, setStartDate, setEndDate, setKeyword } =
    useSearchInput();
  const {
    isInsightRecordModalOpen,
    openInsightRecordModal,
    closeInsightRecordModal,
  } = useInsightRecordModal();

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(keyword ? false : true);
  }, [startDate, endDate, keyword]);

  const handleSearchButton = async () => {
    if (disabled) return;
    const result = startDate
      ? await fetchSearchResult(
          formatToLocalISOString(startDate),
          formatToLocalISOString(endDate),
          keyword
        )
      : await fetchSearchResult("", "", keyword);
    setSearchResult(result);
  };

  useEffect(() => {
    console.log("searchResult: ", searchResult);
  }, [searchResult]);

  // useEffect(() => {
  //   console.log("startDate: ", formatToLocalISOString(startDate));
  // }, [startDate]);

  // useEffect(() => {
  //   console.log("endDate: ", formatToLocalISOString(endDate));
  // }, [endDate]);

  // useEffect(() => {
  //   console.log("keyword: ", keyword);
  // }, [keyword]);

  return (
    <Layout nickname={nickname?.nickName || null}>
      <div className="px-5 xs:px-7 sm:px-10 max-w-[1200px]">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row justify-start items-center gap-2 xs:gap-5">
            <span className="text-[24px] xs:text-[30px] sm:text-[36px] text-black font-bold pl-1">
              검색
            </span>
          </div>
        </div>
        <div className="text-[12px] xs:text-[15px] sm:text-[18px] text-[#979797] font-semibold mt-1 xs:mt-2 pl-1">
          mongo
        </div>
        <SearchInput
          startDate={startDate}
          endDate={endDate}
          keyword={keyword}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setKeyword={setKeyword}
          disabled={disabled}
          handleSearchButton={handleSearchButton}
        />
        {searchResult && searchResult.logfiles.length > 0 ? (
          <LogFileContainer files={searchResult.logfiles} />
        ) : (
          <EmptyBox
            title="로그 파일"
            content="파일이 존재하지 않습니다"
            type="log"
          />
        )}
        {searchResult && searchResult.insights.length > 0 ? (
          <InsightRecordContainer
            files={insightFiles}
            onClick={openInsightRecordModal}
          />
        ) : (
          <EmptyBox title="인사이트 기록" content="기록이 존재하지 않습니다" />
        )}

        {/* <EmptyBox
          title="로그 파일"
          content="파일이 존재하지 않습니다"
          type="log"
        /> */}
        {/* <EmptyBox title="인사이트 기록" content="기록이 존재하지 않습니다" />
        <LogFileContainer files={files} />
        <InsightRecordContainer
          files={insightFiles}
          onClick={openInsightRecordModal}
        /> */}
      </div>
      <InsightRecordModal
        isOpen={isInsightRecordModalOpen}
        onClose={closeInsightRecordModal}
      />
    </Layout>
  );
}
