import { useState } from "react";
import Container from "../commons/container";
import { cls } from "@/utils/class-utils";
import InsightRecord from "./insight-record";

interface InsightRecordProps {
  name: string;
  type: string;
  date: string;
}

interface InsightRecordContainerProps {
  files: InsightRecordProps[];
  onClick: () => void;
}

export default function InsightRecordContainer({
  files,
  onClick,
}: InsightRecordContainerProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const filesPerPage = 9;

  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = files.slice(indexOfFirstFile, indexOfLastFile);

  const totalPages = Math.ceil(files.length / filesPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Container title="인사이트 기록" type="insight">
      <div className="flex flex-col justify-start items-center h-[340px] xs:h-[400px] sm:h-[460px] gap-1.5 xs:gap-2 sm:gap-2.5">
        {currentFiles.map((file, index) => (
          <div key={index} className="w-full">
            <InsightRecord
              name={file.name}
              type={file.type}
              date={file.date}
              onClick={onClick}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={cls(
              "w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 rounded-full mx-1 xs:mx-1.5 sm:mx-2 border border-black",
              currentPage === page ? "bg-black " : "bg-white hover:bg-gray-400"
            )}
          />
        ))}
      </div>
    </Container>
  );
}
