// 외부 라이브러리
import { GetServerSideProps } from "next";
import { useEffect, useRef, useState } from "react";
import Head from "next/head";

// 서버사이드 데이터, 타입 및 API
import {
  ValidateLoginProps,
  getValidateLoginSSR,
} from "@/src/ssr/commons/validate-login-ssr";
import { Nickname } from "@/src/types/login/login-type";
import { SearchResult } from "@/src/types/search/search-type";
import { fetchSearchResult } from "@/src/api/search/search-api";

// 프로젝트 내부 훅과 유틸리티 함수
import useSearchInput from "@/src/hooks/search/use-search-input";
import { formatToLocalISOString } from "@/src/utils/date-utils";

// 프로젝트 내부 컴포넌트
import Layout from "@/src/components/commons/layout";
import SearchInput from "@/src/components/search/search-input";
import LogFileContainer from "@/src/components/search/log-file-container";
import EmptyBox from "@/src/components/commons/empty-box";
import InsightRecordContainer from "@/src/components/search/insight-record-container";

export const getServerSideProps: GetServerSideProps<ValidateLoginProps> =
  getValidateLoginSSR;

export default function Search({
  NicknameSSR,
  AlarmListSSR,
  unreadAlarmCount,
}: ValidateLoginProps) {
  const nicknameRef = useRef<Nickname | null>(NicknameSSR);

  const { startDate, endDate, keyword, setStartDate, setEndDate, setKeyword } =
    useSearchInput();

  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isSearched, setIsSearched] = useState(false);
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
    setIsSearched(true);
  };

  return (
    <>
      <Head>
        <title>LLMN - Search</title>
      </Head>
      <Layout
        nickname={nicknameRef.current?.nickName || null}
        AlarmListSSR={AlarmListSSR}
        unreadAlarmCount={unreadAlarmCount}
      >
        <div className="px-5 xs:px-7 sm:px-10 max-w-[1200px]">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row justify-start items-center gap-2 xs:gap-5">
              <span className="text-[24px] xs:text-[30px] sm:text-[36px] text-black font-bold pl-1">
                검색
              </span>
            </div>
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
          {isSearched ? (
            <>
              {searchResult && searchResult.logfiles.length > 0 ? (
                <LogFileContainer files={searchResult.logfiles} />
              ) : (
                <EmptyBox
                  title="로그 파일"
                  content="파일이 존재하지 않습니다"
                  type="log"
                />
              )}{" "}
            </>
          ) : null}
          {isSearched ? (
            <>
              {searchResult && searchResult.insights.length > 0 ? (
                <InsightRecordContainer files={searchResult.insights} />
              ) : (
                <EmptyBox
                  title="인사이트 기록"
                  content="기록이 존재하지 않습니다"
                />
              )}
            </>
          ) : null}
        </div>
      </Layout>
    </>
  );
}
