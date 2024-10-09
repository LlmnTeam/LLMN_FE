import ButtonSmall from "@/components/button-small";
import Container from "@/components/container";
import EmptyBox from "@/components/empty-box";
import InputSmall from "@/components/input-small";
import InsightRecord from "@/components/insight-record";
import Layout from "@/components/layout";
import LogFileContainer from "@/components/log-file-container";
import Image from "next/image";
import { useState } from "react";

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

export default function Insight() {
  return (
    <Layout>
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
        <div className="flex flex-row justify-start items-center w-full mt-5 xs:mt-6 sm:mt-8">
          <span className="w-[70px] xs:w-[80px] sm:w-[90px] text-[16px] xs:text-[18px] sm:text-[20px] font-bold">
            기간
          </span>
          <div className="flex flex-row justify-start items-center w-full gap-1 xs:gap-2 sm:gap-3 pr-[87px] xs:pr-[95px] sm:pr-[102px] max-w-[800px]">
            <InputSmall
              type="text"
              label=""
              placeholder="시작일"
              maxWidth="282px"
            />
            <span className="text-[16px] xs:text-[18px] sm:text-[20px]">~</span>
            <InputSmall
              type="text"
              label=""
              placeholder="종료일"
              maxWidth="282px"
            />
          </div>
        </div>
        <div className="flex flex-row justify-start items-center w-full mt-3 xs:mt-4 sm:mt-5">
          <span className="w-[70px] xs:w-[80px] sm:w-[90px] text-[16px] xs:text-[18px] sm:text-[20px] font-bold">
            키워드
          </span>
          <div className="flex flex-row justify-start items-center gap-3 xs:gap-4 sm:gap-5 w-full max-w-[800px]">
            <InputSmall
              type="text"
              label=""
              placeholder="검색할 단어를 입력하세요."
              maxWidth="600px"
            />
            <ButtonSmall label="검색" />
          </div>
        </div>
        <EmptyBox
          title="로그 파일"
          content="파일이 존재하지 않습니다"
          type="log"
        />
        <EmptyBox title="인사이트 기록" content="기록이 존재하지 않습니다" />
        <LogFileContainer files={files} />
        <Container title="인사이트 기록" type="insight">
          <div className="flex flex-col justify-start items-center gap-1.5 xs:gap-2 sm:gap-2.5">
            <InsightRecord
              name="Mongo"
              type="일반요약"
              date="2024-09-12 19:00"
            />
            <InsightRecord
              name="Mongo"
              type="일반요약"
              date="2024-09-12 19:00"
            />
            <InsightRecord
              name="Mongo"
              type="일반요약"
              date="2024-09-12 19:00"
            />
            <InsightRecord
              name="Mongo"
              type="일반요약"
              date="2024-09-12 19:00"
            />
            <InsightRecord
              name="Mongo"
              type="일반요약"
              date="2024-09-12 19:00"
            />
            <InsightRecord
              name="Mongo"
              type="일반요약"
              date="2024-09-12 19:00"
            />
            <InsightRecord
              name="Mongo"
              type="일반요약"
              date="2024-09-12 19:00"
            />
            <InsightRecord
              name="Mongo"
              type="일반요약"
              date="2024-09-12 19:00"
            />
            <InsightRecord
              name="Mongo"
              type="일반요약"
              date="2024-09-12 19:00"
            />
          </div>
        </Container>
      </div>
    </Layout>
  );
}
